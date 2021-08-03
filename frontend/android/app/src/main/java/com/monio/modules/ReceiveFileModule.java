package com.monio.modules;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.documentfile.provider.DocumentFile;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.UUID;

import static android.app.Activity.RESULT_OK;

/**
 * Allows react app to get file that was shared to this application
 */
public class ReceiveFileModule extends ReactContextBaseJavaModule {
  private static final String TAG = "ReceiveFileModule";
  private static final String REACT_CLASS = "ReceiveFileModule";
  private static final int REQUEST_PICKER_CODE = 7873;
  private WritableNativeArray sharedFiles = new WritableNativeArray();

  public ReceiveFileModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);

    reactContext.addActivityEventListener(new ActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_PICKER_CODE  && resultCode == RESULT_OK) {
          Log.i(TAG, "User picked file");
          Uri selectedfileUri = data.getData();
          if (selectedfileUri != null) {
            sharedFiles.pushString(saveFile(selectedfileUri).toString());
          }
        }
      }

      @Override
      public void onNewIntent(Intent intent) {
        handleIntent(intent);
      }
    });
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @ReactMethod
  public void getSharedFile(final Promise promise) {
    promise.resolve(sharedFiles);
    sharedFiles = new WritableNativeArray();
  }

  @ReactMethod
  public void askForFile(final String type, final Promise promise) {
    Intent intent = new Intent()
      .setType(type)
      .setAction(Intent.ACTION_OPEN_DOCUMENT);

    getCurrentActivity().startActivityForResult(
      Intent.createChooser(intent, "Select a file"), REQUEST_PICKER_CODE);
  }

  private Uri handleIntent(Intent intent) {
    Uri receiptUri = intent.getData();
    String action = intent.getAction();
    if (action != null && !action.equals(Intent.ACTION_VIEW) && !action.equals(Intent.ACTION_SEND)) {
      return null;
    }

    if (receiptUri == null) {
      receiptUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
    }

    if (receiptUri != null && !receiptUri.getScheme().equals("monio")) {
      Log.i(TAG, "Handle intent: " + receiptUri.getScheme());
      Uri uri = saveFile(receiptUri);
      sharedFiles.pushString(uri.toString());
      return uri;
    } else {
      return null;
    }
  }

  private Uri saveFile(Uri sourceUri) {
    DocumentFile documentFile = DocumentFile.fromSingleUri(getCurrentActivity(), sourceUri);
    String fileName = documentFile.getName();
    Log.i(TAG, "Saving receipt: " + sourceUri.toString());

    UUID fileId = UUID.randomUUID();
    File fileStoragePath = new File(getCurrentActivity().getCacheDir(), fileId.toString());
    fileStoragePath.mkdir();
    File destination = new File(fileStoragePath, fileName);

    FileOutputStream outStream = null;
    try {
      InputStream sourceStream = getCurrentActivity().getContentResolver().openInputStream(sourceUri);
      outStream = new FileOutputStream(destination);
      byte[] buf = new byte[1024];
      int len;
      while((len = sourceStream.read(buf)) > 0){
        outStream.write(buf,0, len);
      }
    } catch (IOException ex) {
      ex.printStackTrace();
    } finally {
      try {
        if (outStream != null) {
          outStream.close();
        }
      }
      catch ( IOException e ) {
        e.printStackTrace();
      }
    }

    Log.i(TAG, "File saved in cache: " + destination);
    return Uri.fromFile(destination);
  }
}

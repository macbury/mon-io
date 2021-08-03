package com.monio.modules;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;

import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.FileProvider;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

import static android.app.Activity.RESULT_OK;

public class TakePictureModule extends ReactContextBaseJavaModule {
  private static final String TAG = "TakePictureModule";
  private static final String REACT_CLASS = "TakePictureModule";
  static final int REQUEST_IMAGE_CAPTURE = 123;
  private Promise cameraPromise;

  private String currentPhotoPath;
  private Uri photoURI;

  private File createImageFile(ReactApplicationContext reactContext) throws IOException {
    String imageFileName = "receipt_"+ UUID.randomUUID().toString();

    File storageDir = reactContext.getCacheDir();
    File image = File.createTempFile(
      imageFileName,  /* prefix */
      ".jpg",         /* suffix */
      storageDir      /* directory */
    );

    // Save a file: path for use with ACTION_VIEW intents
    currentPhotoPath = image.getAbsolutePath();
    return image;
  }


  public TakePictureModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);

    reactContext.addActivityEventListener(new ActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
          cameraPromise.resolve(photoURI.toString());
        }
      }

      @Override
      public void onNewIntent(Intent intent) {

      }
    });
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  //https://developer.android.com/training/camera/photobasics
  @ReactMethod
  public void take(final Promise promise) {
    ReactApplicationContext context = getReactApplicationContext();
    Activity activity = getCurrentActivity();

    Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
    if (takePictureIntent.resolveActivity(context.getPackageManager()) != null) {
      this.cameraPromise = promise;

      File photoFile = null;
      try {
        photoFile = createImageFile(context);

        this.photoURI = FileProvider.getUriForFile(activity, context.getPackageName()+".provider", photoFile);
        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);

        activity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
      } catch (IOException ex) {
        promise.reject(ex);
      }
    }
  }
}

package com.monio.modules;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.monio.services.SyncUploadReceiptsService;

public class UploadReceiptsModule extends ReactContextBaseJavaModule {
  private static final String TAG = "UploadReceiptsModule";
  private static final String REACT_CLASS = "SyncUploadReceiptsModule";

  public UploadReceiptsModule(@NonNull ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @ReactMethod
  public void sync() {
    ReactApplicationContext context = getReactApplicationContext();
    Intent intent = new Intent(context, SyncUploadReceiptsService.class);
    Bundle bundle = new Bundle();// We require an empty bundle to start service
    intent.putExtras(bundle);
    context.startService(intent);
  }
}

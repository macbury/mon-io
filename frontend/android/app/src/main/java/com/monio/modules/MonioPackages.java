package com.monio.modules;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MonioPackages implements ReactPackage {
  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    ArrayList<NativeModule> modules = new ArrayList<NativeModule>();
    modules.add(new UploadReceiptsModule(reactContext));
    modules.add(new ReceiveFileModule(reactContext));
    modules.add(new TakePictureModule(reactContext));
    modules.add(new NotificationModule(reactContext));
    return modules;
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    ArrayList<ViewManager> views = new ArrayList<>();
    return views;
  }
}

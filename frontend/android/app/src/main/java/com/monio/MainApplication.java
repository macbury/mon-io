package com.monio;

import android.app.AlarmManager;
import android.app.Application;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.monio.receivers.UpdateAppReceiver;
import com.monio.services.CheckUpdateService;
import com.monio.services.SyncUploadReceiptsService;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.monio.modules.MonioPackages;
import java.lang.reflect.InvocationTargetException;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;

import java.util.Calendar;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new MonioPackages());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    long size = 100L * 1024L * 1024L; // 50 MB

    ReactDatabaseSupplier
      .getInstance(getApplicationContext())
      .setMaximumSize(size);

    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    this.setupServiceAlarms(this);

    CheckUpdateService.createNotificationChannel(this);
    SyncUploadReceiptsService.createNotificationChannel(this);
  }

  public static void setupServiceAlarms(Context context) {
    AlarmManager alarm = (AlarmManager)context.getSystemService(Context.ALARM_SERVICE);
    Intent intent = new Intent(context, UpdateAppReceiver.class);
    PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
    alarm.setRepeating(AlarmManager.RTC_WAKEUP, System.currentTimeMillis() + 5 * 1000, BuildConfig.DEBUG ? AlarmManager.INTERVAL_FIFTEEN_MINUTES : AlarmManager.INTERVAL_HALF_DAY, pendingIntent);
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.monio.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

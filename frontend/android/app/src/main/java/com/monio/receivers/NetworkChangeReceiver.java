package com.monio.receivers;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.facebook.react.HeadlessJsTaskService;
import com.monio.services.SyncUploadReceiptsService;

import java.util.List;

public class NetworkChangeReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    /**
     This part will be called everytime network connection is changed
     e.g. Connected -> Not Connected
     **/
    if (!isAppOnForeground((context))) {
      /**
       We will start our service and send extra info about
       network connections
       **/
      boolean hasInternet = isNetworkAvailable(context);
      if (hasInternet) {
        Intent serviceIntent = new Intent(context, SyncUploadReceiptsService.class);
        context.startService(serviceIntent);
        HeadlessJsTaskService.acquireWakeLockNow(context);
      }
    }
  }

  public static boolean isNetworkAvailable(Context context) {
    ConnectivityManager cm = (ConnectivityManager)
        context.getSystemService(Context.CONNECTIVITY_SERVICE);
    NetworkInfo netInfo = cm.getActiveNetworkInfo();
    return (netInfo != null && netInfo.isConnected());
  }

  private boolean isAppOnForeground(Context context) {
    /**
     We need to check if app is in foreground otherwise the app will crash.
     http://stackoverflow.com/questions/8489993/check-android-application-is-in-foreground-or-not
     **/
    ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
    List<ActivityManager.RunningAppProcessInfo> appProcesses =
        activityManager.getRunningAppProcesses();
    if (appProcesses == null) {
      return false;
    }
    final String packageName = context.getPackageName();
    for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
      if (appProcess.importance ==
          ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
          appProcess.processName.equals(packageName)) {
        return true;
      }
    }
    return false;
  }
}

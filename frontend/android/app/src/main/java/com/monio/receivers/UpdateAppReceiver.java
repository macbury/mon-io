package com.monio.receivers;

import android.app.AlarmManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;

import com.monio.services.CheckUpdateService;

public class UpdateAppReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent i) {
    Intent intent = new Intent(context, CheckUpdateService.class);
    Bundle bundle = new Bundle();// We require an empty bundle to start service
    intent.putExtras(bundle);
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      context.startForegroundService(intent);
    } else {
      context.startService(intent);
    }
  }
}

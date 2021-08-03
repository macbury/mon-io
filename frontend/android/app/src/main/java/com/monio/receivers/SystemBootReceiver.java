package com.monio.receivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.monio.MainApplication;

public class SystemBootReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    MainApplication.setupServiceAlarms(context);
  }
}

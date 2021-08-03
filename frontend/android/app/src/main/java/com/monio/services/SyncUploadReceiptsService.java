package com.monio.services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import com.monio.MainActivity;
import com.monio.R;

public class SyncUploadReceiptsService extends HeadlessJsTaskService {
  private static final String TAG = "SyncUploadReceipts";
  private static final int UPLOAD_TIMEOUT = 10 /*minutes*/ * 60 * 1000;
  public static final String CHANNEL_ID = "SyncReceipts";
  private static final int SERVICE_NOTIFICATION_ID = 1;

  @Override
  public IBinder onBind(Intent intent) {
    // TODO: Return the communication channel to the service.
    throw new UnsupportedOperationException("Not yet implemented");
  }

  @Override
  public int onStartCommand(Intent intent, int flags, int startId) {
    Intent notificationIntent = new Intent(this, MainActivity.class);
    PendingIntent contentIntent = PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
    Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
        .setContentTitle("Syncing receipts")
        .setContentText("Running...")
        .setSmallIcon(R.drawable.ic_stat_iconfinder_698_balance_budget_diagram_financial_graph_bank_banking_money_business_4158610)
        .setContentIntent(contentIntent)
        .setProgress(0, 0, true)
        .setOngoing(true)
        .build();
    startForeground(SERVICE_NOTIFICATION_ID, notification);
    return super.onStartCommand(intent, flags, startId);
  }

  public static void createNotificationChannel(Context context) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      int importance = NotificationManager.IMPORTANCE_DEFAULT;
      NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Sync receipts", importance);
      channel.setDescription("Sync receipts");
      NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
      notificationManager.createNotificationChannel(channel);
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Log.i(TAG, "Created");
    // add wake lock here
  }

  @Override
  public void onDestroy() {
    super.onDestroy();
    Log.i(TAG, "Destroyed");
    // drop wake lock here
  }

  @Nullable
  @Override
  protected HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "SyncUploadReceiptsService",
          Arguments.fromBundle(extras),
          UPLOAD_TIMEOUT, // timeout for the task
          true // optional: defines whether or not  the task is allowed in foreground. Default is false
      );
    }
    return null;
  }
}

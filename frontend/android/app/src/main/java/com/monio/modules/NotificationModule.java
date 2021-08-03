package com.monio.modules;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.monio.MainActivity;
import com.monio.R;
import com.monio.services.CheckUpdateService;

import java.util.HashMap;
import java.util.Map;

import static android.app.Activity.RESULT_OK;

public class NotificationModule extends ReactContextBaseJavaModule {
  private static final String REACT_CLASS = "NotificationModule";
  private WritableNativeArray collectedExtras = new WritableNativeArray();

  public NotificationModule(ReactApplicationContext reactContext) {
    super(reactContext);

    reactContext.addActivityEventListener(new ActivityEventListener() {
      @Override
      public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
      }

      @Override
      public void onNewIntent(Intent intent) {
        if (intent != null && intent.getExtras() != null) {
          WritableNativeMap map = new WritableNativeMap();
          for (String key: intent.getExtras().keySet()) {
            map.putString(key, intent.getStringExtra(key));
          }
          collectedExtras.pushMap(map);
        }
      }
    });
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @ReactMethod
  public void getIntentResults(final Promise promise) {
    promise.resolve(collectedExtras);
    collectedExtras = new WritableNativeArray();
  }

  @ReactMethod
  public void showNotification(int notificationId, String title, String description, ReadableMap extras) {
    Intent notificationIntent = new Intent(this.getReactApplicationContext(), MainActivity.class);

    if (extras != null) {
      Bundle bundle = new Bundle();
      HashMap<String, Object> map = extras.toHashMap();

      for (Map.Entry<String, Object> entry: map.entrySet()) {
        bundle.putString(entry.getKey(), entry.getValue().toString());
      }
      notificationIntent.putExtras(bundle);
    }

    PendingIntent contentIntent = PendingIntent.getActivity(this.getReactApplicationContext(), 0, notificationIntent, PendingIntent.FLAG_CANCEL_CURRENT);
    Notification notification = new NotificationCompat.Builder(this.getReactApplicationContext(), CheckUpdateService.CHANNEL_ID)
      .setContentTitle(title)
      .setContentText(description)
      .setAutoCancel(true)
      .setPriority(NotificationCompat.PRIORITY_HIGH)
      .setSmallIcon(R.drawable.ic_stat_iconfinder_698_balance_budget_diagram_financial_graph_bank_banking_money_business_4158610)
      .setContentIntent(contentIntent)
      .build();

    NotificationManager notificationManager = (NotificationManager) getReactApplicationContext().getSystemService(Service.NOTIFICATION_SERVICE);
    notificationManager.notify(notificationId, notification);
  }
}

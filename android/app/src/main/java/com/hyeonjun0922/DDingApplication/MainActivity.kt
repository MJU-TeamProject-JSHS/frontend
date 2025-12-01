package com.hyeonjun0922.DDingApplication

import android.content.pm.PackageInfo
import android.content.pm.PackageManager
import android.content.pm.Signature
import android.os.Build
import android.os.Bundle
import android.util.Base64
import android.util.Log

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import expo.modules.ReactActivityDelegateWrapper

import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    // Set the theme to AppTheme BEFORE onCreate to support
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    super.onCreate(null)
    
    // 카카오 개발자 콘솔에 등록할 키 해시 출력
    getKeyHash()
  }

  private fun getKeyHash() {
    try {
      val info: PackageInfo = packageManager.getPackageInfo(
        packageName,
        PackageManager.GET_SIGNATURES
      )
      val signatures = info.signatures
      if (signatures != null && signatures.isNotEmpty()) {
        for (signature in signatures) {
          val md: MessageDigest = MessageDigest.getInstance("SHA")
          md.update(signature.toByteArray())
          val keyHash = Base64.encodeToString(md.digest(), Base64.DEFAULT)
          Log.d("KeyHash", "=========================================")
          Log.d("KeyHash", "카카오 개발자 콘솔에 등록할 키 해시:")
          Log.d("KeyHash", keyHash.trim())
          Log.d("KeyHash", "=========================================")
        }
      } else {
        Log.w("KeyHash", "서명 정보를 찾을 수 없습니다")
      }
    } catch (e: PackageManager.NameNotFoundException) {
      Log.e("KeyHash", "패키지를 찾을 수 없습니다", e)
    } catch (e: NoSuchAlgorithmException) {
      Log.e("KeyHash", "알고리즘을 찾을 수 없습니다", e)
    } catch (e: Exception) {
      Log.e("KeyHash", "키 해시를 가져오는 중 오류 발생", e)
    }
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "main"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
          this,
          BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
          object : DefaultReactActivityDelegate(
              this,
              mainComponentName,
              fabricEnabled
          ){})
  }

  /**
    * Align the back button behavior with Android S
    * where moving root activities to background instead of finishing activities.
    * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
    */
  override fun invokeDefaultOnBackPressed() {
      if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
          if (!moveTaskToBack(false)) {
              // For non-root activities, use the default implementation to finish them.
              super.invokeDefaultOnBackPressed()
          }
          return
      }

      // Use the default back button implementation on Android S
      // because it's doing more than [Activity.moveTaskToBack] in fact.
      super.invokeDefaultOnBackPressed()
  }
}

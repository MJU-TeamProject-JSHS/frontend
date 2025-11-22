import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';

export default function PDFViewerScreen({ route }: any) {
  const pdfModule = route?.params?.pdfModule; // ✅ 안전하게 꺼내기
  const [viewerUri, setViewerUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!pdfModule) return; // ✅ params 없으면 그냥 대기

      const pdfAsset = Asset.fromModule(pdfModule);
      await pdfAsset.downloadAsync();
      const pdfUri = pdfAsset.localUri || pdfAsset.uri;

      const viewerAsset = Asset.fromModule(
        require('../../../assets/pdf/viewer.html')
      );
      await viewerAsset.downloadAsync();
      const htmlUri = viewerAsset.localUri || viewerAsset.uri;

      setViewerUri(`${htmlUri}?file=${encodeURIComponent(pdfUri)}`);
    })();
  }, [pdfModule]);

  // ✅ pdfModule이 아예 없을 때 안내 화면
  if (!pdfModule) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', alignItems:'center', justifyContent:'center' }}>
        <Text style={{ color:'#fff' }}>PDF 파일 정보가 없습니다.</Text>
        <Text style={{ color:'#9ca3af', marginTop:8 }}>BoardDetail에서 첨부를 눌러 진입하세요.</Text>
      </View>
    );
  }

  if (!viewerUri) {
    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
  }

  return (
    <WebView
      originWhitelist={['*']}
      source={{ uri: viewerUri }}
      style={{ flex: 1 }}
      javaScriptEnabled
      allowFileAccess
      allowUniversalAccessFromFileURLs
    />
  );
}

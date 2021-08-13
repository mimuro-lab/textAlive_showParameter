import { Player, IRepetitiveSegments } from "textalive-app-api";

/////////////////////// TextAlive Player を作る ///////////////////////
// optionに関するリファレンスは以下。
// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
const player = new Player({

	// アプリの情報を指定する。
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playerappoptions.html
	app: {token: "cxp44myZUreTs0lG", appAuthor: "mimuro_syunya", appName: "textAlive_text"},
	
	// 読み込むフォントを指定する。nullだとすべて読み込む。
	//fontFamilies: null,

	// 歌詞テキストを読み込むタイムアウト時刻を指定。0だとタイムアウトしない。
	// ※0を指定すると、歌詞のanimationへの関数代入がうまくいかない。（2021/08/10）
	//lyricsFetchTimeout: 0,

	// 音源メディアの情報を表示する位置を指定する。座標指定ではない。でもすげぇ。
	// https://developer.textalive.jp/packages/textalive-app-api/globals.html#playerbannerposition
	mediaBannerPosition: "buttom right",

	// 音源メディアを指定する。
	mediaElement: document.querySelector("#media"),

	// throttleアップデート関数の発行間隔をしていする。ミリセカンド。
	//throttleInterval: 10,

	// TextAlive Playerの音源の再生状態を管理するTimerインスタンス。よくわからん。。。
	//timer: ,

	// V/A空間の座標値を取得するか否か。
	// V/A空間について：https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_uri&item_id=142056&file_id=1&file_no=1
	// V/A空間は、ある時刻の音源に対する感情の指標である。VはValance(怪ー不快)、Activation(活性ー日活性)の二軸で表される。例えば、喜びは二軸ともに正。
	valenceArousalEnabled: true,

	// 声量情報を取得するかどうか。
	vocalAmplitudeEnabled: true,

});

/////////////////////// イベントリスナを登録する /////////////////////// 
// 3種類のイベントリスナから指定する。PlayerEventListener, PlyaerAppListener, LoaderListener
// 指定したイベントリスナは、必ずoverrideして定義しなければならない。
// https://developer.textalive.jp/packages/textalive-app-api/globals.html#playerlistener
player.addListener({
	// PlayerEventListenerのイベントリスナ
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playereventlistener.html
	//onDispose, 				// プレイヤーが破棄されるとき
	//onMediaElementSet,	 	// 音源メディアが変更されたとき(配属先のDOM要素が変更されたとき)
	//onMediaSeek,			// 再生中の楽曲の再生位置が変更されたとき
	//onPause,				// 再生中の楽曲が一時停止されたとき
	//onPlay,					// 楽曲の再生が始まったとき
	//onResize,				// ステージサイズが変更されたとき（ステージってなに？2021/08/10）
	//onSeek,					// 再生中の楽曲の再生位置がユーザーによって変更されたとき
	//onStop,					// 再生中の楽曲が一時停止されたとき
	//onThrottledTimeUpdate,	// 動画の再生位置が変更されたときに呼ばれる（あまりに頻繁な発火を防ぐため一定間隔に間引かれる）、間隔時間はPlayerクラスのオプションで設定可能。
	onTimeUpdate,			// 動画の再生位置が変更されたときに呼ばれる
	//onTimerReady,			// 動画のためのTimerの準備が整ったとき
	onVideoReady,			// 動画オブジェクトの準備が整ったとき
	//onVideoSeek,			// 動画のシーク操作が行われたとき
	//onVideoSeekEnd,			// 動画のシーク操作が終わったとき
	//onVideoSeekStart,		// 動画のシーク操作が始まったとき
	//onVolumeUpdate,			// 音量が変更されたとき

	// PlayerAppListenerのイベントリスナ
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/playerapplistener.html
	//onAppConnected, 		// TextAliveAppAPIサーバとの接続時に呼ばれる
	//onAppMediaChange,		// 再生すべき楽曲URLが変更されたとき
	//onAppParameterUpdate,	// TextAliveアプリのパラメタが変更されたときに呼ばれる
	onAppReady,				// TextAliveホストとの接続時に呼ばれる
	
	// LoaderListenerのイベントリスナ。このリスナは、DataLoaderListenerの中で、さらに4つに分かれる。
	// DataLoaderListener -> VideoLoaderListener, SongLoaderListener, TextLoaderListener, FontLoaderListener
	// ↓ LoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/globals.html#loaderlistener
	// ↓ VideoLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/videoloaderlistener.html
	// ↓ SongLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/songloaderlistener.html
	// ↓ TextLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/textloaderlistener.html
	// ↓ FontLoaderListenerのリファレンス
	// https://developer.textalive.jp/packages/textalive-app-api/interfaces/fontloaderlistener.html
	//onVideoLoad, 			// 動画データが読み込まれたとき
	//onSongInfoLoad,			// 楽曲の詳細情報が読み込まれたとき
	//onSongLoad,				// 楽曲の基本情報が読み込まれたとき
	//onSongMapLoad,			// 楽曲地図が読み込まれたとき
	//onValenceArousalLoad,	// V/A空間が読み込まれたとき
	//onVocalAmplitudeLoad,	// 声量の情報が読み込まれたとき
	//onLyricsLoad,			// 歌詞テキストの発生タイミング情報が読み込まれたとき
	//onTextLoad,				// 歌詞テキストが読み込まれたとき
	//onFontsLoad,			// フォントが読み込まれたとき

});

// アニメーション関数の定義、フレーズ、単語、文字
// フレーズが発声されていたら #text_phrase に表示する
const animatePhrase = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_phrase").textContent = unit.text;
	}
};

// 単語が発声されていたら #text_word に表示する
const animateWord = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_word").textContent = unit.text;
	}
};

// 文字が発声されていたら #text_char に表示する
const animateChar = function (now, unit) {
	if (unit.contains(now)) {
		document.querySelector("#text_char").textContent = unit.text;
	}
};

// TextAlive ホストとの接続時に呼ばれる
<<<<<<< HEAD
=======
// 楽曲を読み込む。
// 楽曲：その心に灯る色は / ラテルネさん（https://www.youtube.com/watch?v=bMtYf3R0zhY）。神曲。
>>>>>>> b10cbf90b2a1c9ab171e4124cbf4555ff066e4b6
function onAppReady(app){
	player.createFromSongUrl("https://www.youtube.com/watch?v=bMtYf3R0zhY");
	//player.createFromSongUrl("https://www.youtube.com/watch?v=ygY2qObZv24");
	document.querySelector("#onAppReady").textContent = "準備完了";
}

// 動画データが読み込まれたとき
// 楽曲情報を表示する。アニメーション関数を割り当てる。
function onVideoReady(v){

	// サビ情報を読み取る
	var segments_contenst = "";
	// for文でarrayをすべてたどる
	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of
	for(const element of player.data.songMap.segments){
		segments_contenst = segments_contenst + String(element.chorus) + "(" + String(element.duration) + " [ms]), ";
	}

	document.querySelector("#segments").textContent = segments_contenst;

	document.querySelector("#song_name").textContent = player.data.song.name;
	document.querySelector("#song_permalink").textContent = player.data.song.permalink;
	document.querySelector("#song_artist").textContent = player.data.song.artist.name;

	// 定期的に呼ばれる各フレーズの "animate" 関数をセットする
	let w;
	// Set "animate" function
  	w = player.video.firstPhrase;
  	while (w) {
    	w.animate = animatePhrase;
    	w = w.next;
  	}
	// 定期的に呼ばれる各単語の "animate" 関数をセットする
  	// Set "animate" function
  	w = player.video.firstWord;
  	while (w) {
    	w.animate = animateWord;
    	w = w.next;
  	}
	// 定期的に呼ばれる各文字の "animate" 関数をセットする
  	// Set "animate" function
  	w = player.video.firstChar;
  	while (w) {
    	w.animate = animateChar;
    	w = w.next;
  	}
	document.querySelector("#onVideoReady").textContent = "準備完了";
}

// 楽曲の再生位置が更新されたときに呼び出される。（再生中常に呼び出される）
// index.htmlの各変数を随時更新する。
function onTimeUpdate(position){
	document.querySelector("#position").textContent = position;
	document.querySelector("#beat_index").textContent = player.findBeat(position).index;
	document.querySelector("#beat_duration").textContent = player.findBeat(position).duration;
	document.querySelector("#chord_index").textContent = player.findChord(position).index;
	document.querySelector("#chord_duration").textContent = player.findChord(position).duration;
	document.querySelector("#chorus_index").textContent = player.findChorus(position).index;
	document.querySelector("#chorus_duration").textContent = player.findChorus(position).duration;
	document.querySelector("#VA_A").textContent = player.getValenceArousal(position).a;
	document.querySelector("#VA_V").textContent = player.getValenceArousal(position).v;
	document.querySelector("#volume").textContent = player.getVocalAmplitude(position);
	document.querySelector("#phrase").textContent = player.video.findPhrase(position).text;
	document.querySelector("#word").textContent = player.video.findWord(position).text;
	document.querySelector("#char").textContent = player.video.findChar(position).text;
}

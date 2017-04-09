window.onload = function() {

    var currentBackgroundIndex = 1;
    var changeBackground = document.getElementById('change-background');

    var audio = document.getElementById('audio');
    var canvas = document.getElementById('progress');
    var context = canvas.getContext('2d');
    var progress = document.getElementById('progress');

    var toBack = document.getElementById('to-back');

    var playpause = document.getElementById("playpause");
    var backward = document.getElementById("backward");
    var forward = document.getElementById("forward");
    var volume = document.getElementById("volume");

    var isLoop = document.getElementById("is-loop");
    var isCurrentLoop = false;
    var isVolumeOff = document.getElementById("is-volume-off");
    var isCurrentVolumeOff = false;

    var playlist = document.getElementById("playlist");
    var audioList = playlist.getElementsByTagName("li");
    var len = audioList.length;
    var isOff = true;

    var append = true;

    var currentAudioIndex = 1;
    var mySongs = new Array("Lost Stars", "Sugar", "Shattered");

    /**
     * 更换背景图
     * @return [type] [description]
     */
    changeBackground.onclick = function() {

        var randomInt = Math.floor(Math.random() * 4) + 1;
        while (randomInt == currentBackgroundIndex) {
            randomInt = Math.floor(Math.random() * 4) + 1;
        }
        currentBackgroundIndex = randomInt;
        var bgUrl = "assets/source/background/bg" + currentBackgroundIndex + ".jpg";
        document.body.style.backgroundImage = "url(" + bgUrl + ")";

    };

    /* 默认第一首歌曲 */
    getMp3JsonData(mySongs[currentAudioIndex]);

    /**
     * 获取歌曲json数据
     * @param  {[type]} name 要获取的歌曲名
     * @return [type]        [description]
     */
    function getMp3JsonData(name) {

        //将返回的结果给函数：parseMp3Data（在h5页面的脚本中定义）
        var url = "http://s.music.163.com/search/get/?type=1&filterDj=false&s=" + name + "&limit=1&offset=0&callback=parseMp3Data";

        var scriptEle = document.createElement('script');
        scriptEle.setAttribute('src', url);
        var headEle = document.getElementsByTagName('head')[0];
        if (append) {
            headEle.appendChild(scriptEle);
            append = false;
        } else
            headEle.replaceChild(scriptEle, document.getElementsByTagName("script")[4]);

    };

    /**
     * 控制是否循环播放
     * @type {[type]}
     */
    isLoop.onclick = function() {

        if (!isCurrentLoop) {
            audio.loop = "loop";
            isLoop.style.color = "#26C5CB";
            isCurrentLoop = true;
        } else {
            audio.loop = "";
            isLoop.style.color = "#fff";
            isCurrentLoop = false;
        }
    }

    /**
     * 控制是否静音
     * @type {[type]}
     */
    isVolumeOff.onclick = function() {

        if (!isCurrentVolumeOff) {
            audio.muted = true;
            isVolumeOff.style.color = "#26C5CB";
            isCurrentVolumeOff = true;
        } else {
            audio.muted = false;
            isVolumeOff.style.color = "#fff";
            isCurrentVolumeOff = false;
        }
    }

    /**
     * 播放以及暂停键的功能
     * @return [type] [description]
     */
    playpause.onclick = function togglePlayPause() {
        if (!isOff) {
            audio.pause();
            playpause.innerHTML = '<i class="fa fa-play"></i>';
        } else {
            audio.play();
            playpause.innerHTML = '<i class="fa fa-pause"></i>';
        }
        isOff = !isOff;
    }

    /**
     * 下一首
     * @return [type] [description]
     */
    forward.onclick = function() {
        currentAudioIndex++;
        if (currentAudioIndex >= len) {
            currentAudioIndex = 0;
            getMp3JsonData(mySongs[currentAudioIndex]);
            audioList[len - 1].className = "";
            audioList[0].className = "active icon-heart";
        } else {
            getMp3JsonData(mySongs[currentAudioIndex]);
            audioList[currentAudioIndex - 1].className = "";
            audioList[currentAudioIndex].className = "active icon-heart";
        }
        resetPlayer();

    }

    /**
     * 前一首
     * @return [type] [description]
     */
    backward.onclick = function() {
        currentAudioIndex--;
        if (currentAudioIndex < 0) {
            currentAudioIndex = len - 1;
            getMp3JsonData(mySongs[currentAudioIndex]);
            audioList[0].className = "";
            audioList[currentAudioIndex].className = "active icon-heart";
        } else {
            getMp3JsonData(mySongs[currentAudioIndex]);
            audioList[currentAudioIndex + 1].className = "";
            audioList[currentAudioIndex].className = "active icon-heart";
        }
        resetPlayer();
    }

    /**
     * 播放列表内元素点击事件
     * @param  {[type]} var [description]
     * @return [type]       [description]
     */
    for (var i = 0; i < len; i++) {
        audioList[i].index = i;
        audioList[i].onclick = function() {
            for (var j = 0; j < len; j++) {
                audioList[j].className = "";
                audio.src = "";
            }
            this.className = "active icon-heart";
            getMp3JsonData(mySongs[this.index]);
            audio.play();
            resetPlayer();
            toBack.checked = !toBack.checked;
        }
    }


    /**
     * 音量控制
     * @return [type] [description]
     */
    volume.onchange = function() {
        audio.volume = volume.value;
    }

    /* 为音频和进度条绑定监听事件，使进度条能随时间更新进度 */
    audio.addEventListener('timeupdate', function() {
        updateProgress();
    }, false);

    /* 为音频添加播放完毕的监听事件 */
    audio.addEventListener('ended',function(){
        resetPlayer();
    },false);


    /**
     * 进度条状态更新方法
     * @return [type] [description]
     */
    function updateProgress() {
        var percent = Math.floor((100 / audio.duration) * audio.currentTime);
        progress.value = percent;
        context.clearRect(0, 0, canvas.width, canvas.height);
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 150;
        var circ = Math.PI * 2;
        var quart = Math.PI / 2;
        var cpercent = percent / 100;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, ((circ) * cpercent), false);
        context.lineWidth = 10;
        context.strokeStyle = '#26C5CB';
        context.stroke();
        if (audio.ended) resetPlayer();
    }

    /**
     * 重置歌曲
     */
    function resetPlayer() {
        audio.currentTime = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);
        playpause.title = "Play";
        playpause.innerHTML = '<i class="fa fa-play"></i>';
        if(!isOff){
            isOff = !isOff;
        }
    }
}

tiles = [];
times = 0;
PassSec = 0;   // 秒数カウント用変数

window.onload = function() {

    document.getElementById("startcount").disabled = false;
    
    var arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O',''];

    // シャッフル
    shuffle(arr);

    var panel = document.getElementById('panel');
    
    // タイル作成
    for (i = 0; i < 16; i++){
        var div = document.createElement('div');
        div.className = 'tile';
        div.index = i;
        div.textContent = arr[i];
        div.onclick = click;
        panel.appendChild(div);
        tiles.push(div);
    }

    var times_msg = "移動回数 ： " + times;
    document.getElementById("times").innerHTML = times_msg;
} 

// タイルのシャッフル
function shuffle(arr) {
    var n = 200;
    var temp, i;
    var spacePoint

    for (i = 0; i < n; i++)
    {
        spacePoint = arr.indexOf('');
        if(spacePoint >= 12)
        {
            if(spacePoint % 4 == 3) changePoint = spacePoint + changePosition(2,1);
            else if(spacePoint % 4 == 0) changePoint = spacePoint + changePosition(2,2);
            else changePoint = spacePoint + changePosition(3,5);
        }
        else if(spacePoint <= 3)
        {
            if(spacePoint % 4 == 3) changePoint = spacePoint + changePosition(2,3);
            else if(spacePoint % 4 == 0) changePoint = spacePoint + changePosition(2,4);
            else changePoint = spacePoint + changePosition(3,6);
        }
        else if(spacePoint % 4 == 3)
        {
            changePoint = spacePoint + changePosition(3,7);
        }
        else if(spacePoint % 4 == 0)
        {
            changePoint = spacePoint + changePosition(3,8);
        }
        else 
        {
            changePoint = spacePoint + changePosition(4,0);
        }
        temp = arr[spacePoint];
        arr[spacePoint] = arr[changePoint];
        arr[changePoint] = temp;
    }
    return arr;
}

// 移動する場所の決定
function changePosition(i, flag)
{
    var result;
    if(i == 2)
    {
        result = Math.floor(Math.random()*2+1);
        
        if(flag == 1)
        {
            switch(result)
            {
                case 1:
                    return -1;
                case 2:
                    return -4;
            }
        }
        if(flag == 2)
        {
            switch(result)
            {
                case 1:
                    return 1;
                case 2:
                    return -4;
            }
        }
        if(flag == 3)
        {
            switch(result)
            {
                case 1:
                    return -1;
                case 2:
                    return 4;
            }
        }
        if(flag == 4)
        {
            switch(result)
            {
                case 1:
                    return 1;
                case 2:
                    return 4;
            }
        }
    }
    if(i == 3)
    {
        result = Math.floor(Math.random()*3+1);

        if(flag == 5 || flag == 6)
        {
            switch(result)
            {
                case 1:
                    return -1;
                case 2:
                    return 1;
                case 3:
                    if(flag == 5) return -4;
                    else return 4;
            }
        }
        if(flag == 7 || flag == 8)
        {
            switch(result)
            {
                case 1:
                    return -4;
                case 2:
                    return 4;
                case 3:
                    if(flag == 7) return -1;
                    else return 1;
            }
        }
    }
    if(i == 4)
    {
        result = Math.floor(Math.random()*4+1);

        switch(result)
        {
            case 1:
                return -1;
            case 2:
                return 1;
            case 3:
                return -4;
            case 4:
                return 4;
        }
    }
}

// タイルの移動処理
function swapContent(point, space, flag){
    var temp;

    if(space < point)
    {
        for(i = space; i < point; i += flag)
        {
            temp = tiles[i].textContent;
            tiles[i].textContent = tiles[i + flag].textContent;
            tiles[i + flag].textContent = temp;
        }
    }
    if(point < space)
    {
        for(i = space; i > point; i -= flag)
        {
            temp = tiles[i].textContent;
            tiles[i].textContent = tiles[i - flag].textContent;
            tiles[i - flag].textContent = temp;
        }
    }

    times++;
    var times_msg = "移動回数 ： " + times;
    document.getElementById("times").innerHTML = times_msg;
}

// 正解かを判定
function clearFlag(tiles,clear){
    var i;

    for (i = 0; i < 16; i++)
    {
        if(tiles[i].textContent !== clear[i]) break;
    }
    if(i == 16)
    {
        if(document.getElementById("startcount").disabled)
        {
            stopShowing()
        }
        target = document.getElementById("output");
        target.innerHTML = "Clear";
    }
}

// クリック時の処理
function click(e) {
    var clear = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O',''];
    var i = e.target.index;
    var j;

    for(k = 0; k < 16; k++)
    {
        if(tiles[k].textContent == '')
        {
            j = k;
            break;
        }
    }

    if(i % 4 == j % 4)
    {
        if(i !== j) swapContent(i, j, 4);
    }
    else if(Math.floor(i/4) == Math.floor(j/4))
    {
        if(i !== j) swapContent(i, j, 1);
    } 

    clearFlag(tiles,clear);
}
 
// 経過時間の表示
function showPassage() {
    PassSec++;   // カウントアップ
    var msg = "経過時間 ： " + PassSec;
    document.getElementById("PassageArea").innerHTML = msg;
}

// 時間計測の開始
function startShowing() {
    PassSec = 0;
    PassageID = setInterval('showPassage()',1000);
    document.getElementById("startcount").disabled = true;
    
}

// 時間計測の停止
function stopShowing() {
    clearInterval( PassageID );
    document.getElementById("startcount").disabled = false;
}
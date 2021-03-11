var height;
var weight;
var bmiStorage = [];
var op = document.querySelector('.op');
document.querySelector('.btn-result').addEventListener('click', check, false);
document.querySelector('.bmihead').addEventListener('keydown', kbcheck, false);
document.querySelector('.refresh-btn').addEventListener('click', reset, false);
document.querySelector('.clear').addEventListener('click', clear, false);
function kbcheck(e){
    if(e.keyCode == 13){
        check();
    };
}
function check(e){
    //e.preventDefault();
    height = Number(document.getElementById('height').value);
    weight = Number(document.getElementById('weight').value);
    if(height == 0 || weight == 0){
        alert('輸入數值不得為0');
        return;
    } else if(Number.isNaN(height) || Number.isNaN(weight)){
        alert('輸入項目必為數值');
        return;
    }
    save();
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
};
function save(){
    count(height, weight);
    localStorage.setItem('bmiData', JSON.stringify(bmiStorage));
    write();
};
function count(height, weight){
    var buffer = {
        'status': '',
        'index': (weight/((height/100)*(height/100))).toFixed(2),
        'height': height,
        'weight': weight,
        'date': '',
        'color': '',
    };
    if(buffer.index < 18.5){
        buffer.status = '過輕';
        buffer.color = 'info';
    } else if(buffer.index < 24){
        buffer.status = '正常';
        buffer.color = 'success';
    } else if(buffer.index < 27){
        buffer.status = '過重';
        buffer.color = 'lightorg';
    } else if(buffer.index < 30){
        buffer.status = '輕度肥胖';
        buffer.color = 'lightorg';
    } else if(buffer.index < 35){
        buffer.status = '中度肥胖';
        buffer.color = 'warning';
    } else{
        buffer.status = '重度肥胖'
        buffer.color = 'danger';
    };
    buffer.date = getDate();
    bmiStorage.push(buffer);
};
function getDate(){
    var today = new Date()
    var year  = today.getFullYear()
    var mon   = today.getMonth()
    var day   = today.getDate()

    function addzero(num){
        if(num < 10){ return '0' + num } 
        return num;
      }

    return year+'-'+addzero(mon+1)+'-'+addzero(day);
};
function write(){
    var buffer = JSON.parse(localStorage.getItem('bmiData'));
    var str = '';
    var lg = buffer.length-1;
    for(var i=0 ; i<buffer.length; i++){
        str += '<li class="border-start border-5 op-item fs-4 border-' + buffer[i].color + '" data-set="' + i + '">'+
        '<div class="col">'+
            '<span class="result">' + buffer[i].status + '</span>'+
        '</div>'+
        '<div class="col">'+
            '<span class="fs-6">BMI</span>'+
            '<span class="bmi">' + buffer[i].index + '</span>'+
        '</div>'+
        '<div class="col d-none d-md-block">'+
            '<span class="fs-6">height</span>'+
            '<span class="height-op">' + buffer[i].height + '</span>'+
        '</div>'+
        '<div class="col d-none d-md-block">'+
            '<span class="fs-6">weight</span>'+
            '<span class="weight-op">' + buffer[i].weight + '</span>'+
        '</div>'+
        '<div class="col d-none d-md-block">'+
            '<span class="fs-6 data">' + buffer[i].date + '</span>'+
        '</div></li>';
    }
    op.innerHTML = str;
    document.querySelector('.refresh').classList.remove('d-none');
    document.querySelector('.refresh').classList.add('border-'+buffer[lg].color, 'text-'+buffer[lg].color);
    document.querySelector('.refresh-btn').classList.add('bg-'+buffer[lg].color);  
    document.querySelector('.btn-result').classList.add('d-none');
    document.querySelector('.bmi-result').textContent = buffer[lg].index;
};
function reset(){
    document.querySelector('.refresh').setAttribute('class', 'd-none refresh position-relative mt-3 border border-5');
    document.querySelector('.refresh-btn').setAttribute('class', 'refresh-btn position-absolute');
    document.querySelector('.btn-result').classList.remove('d-none');
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
};
function clear(){
    localStorage.removeItem('bmiData');
    bmiStorage = [];
    op.innerHTML = '';
};

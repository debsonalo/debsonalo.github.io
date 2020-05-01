let count=+document.getElementById('value').innerHTML;
const minus=document.getElementById('minus');
const plus=document.getElementById('plus');
plus.addEventListener('click', ()=>{
    count++;
    document.getElementById('value').innerHTML=count;
}
);
minus.addEventListener('click',()=>{
    count--;
    document.getElementById('value').innerHTML=count;
}
);
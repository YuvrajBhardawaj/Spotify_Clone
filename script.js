console.log("Welcome to Spotify");
let songIndex=0;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let masterSong=document.getElementById('masterSong');
let MyProgressBar=document.getElementById('MyProgressBar');
let gif=document.getElementById('gif');
gif.style.opacity=0;
let songItem=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName: 'Meri Maa Ke Barabar Koi Nahi',filePath: "1.mp3",coverPath: "Meri_Maa.jpg"},
    {songName: 'Govind Bolo Hari',filePath: "2.mp3",coverPath: "govind_bolo.jpg"},
    {songName: 'Shri Krishna Govind Hare Murari',filePath: "3.mp3",coverPath: "Shri_Krishna_Govind.jpg"},
    {songName: 'Kaun Kehte Hain Bhagwan Aate Nahi',filePath: "4.mp3",coverPath: "kaun_khete_hai.jpg"},
    {songName: 'Shish Nawata Hoon',filePath: "5.mp3",coverPath: "Shish_Nawata_hoon.jpg"},
    {songName: 'Mein Balak Tu Mata',filePath: "6.mp3",coverPath: "Mein_Balak.jpg"},
];
songItem.forEach((element,i)=> {
    //  console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        gif.style.opacity=0;
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play');
        audioElement.pause();
    }
});
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate'); //update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);  
    MyProgressBar.value=progress;
});
MyProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=MyProgressBar.value*audioElement.duration/100;
});
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element => {
      element.classList.remove('fa-circle-pause');
      element.classList.add('fa-play');
    });
}; 
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        gif.style.opacity=1;
        index=parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`${index}.mp3`;
        masterSong.innerText=songs[index-1].songName;
        audioElement.currentTime=0;
        audioElement.play(); 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    });
});
document.getElementById('forward').addEventListener('click',(e)=>{
    if(index>5){
        index=1;
    }
    else{
        index+=1;
    }
    makeAllPlays();
    audioElement.src=`${index}.mp3`;
    audioElement.currentTime=0;
    gif.style.opacity=1;
    audioElement.play(); 
    masterSong.innerText=songs[index-1].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
document.getElementById('backward').addEventListener('click',()=>{
    if(index==0){
        index=5;
    }
    else{
        index-=1;
    }
    audioElement.src=`${index}.mp3`;
    audioElement.currentTime=0;
    gif.style.opacity=1;
    audioElement.play(); 
    masterSong.innerText=songs[index].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});
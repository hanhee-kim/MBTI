import {results, mbtis} from './data.js'
//mbti 의 문자를 얻어옴
const mbti = new URLSearchParams(location.search).get('mbti')
console.log(mbti)
const result = results[mbtis[mbti]]

const titleEl = document.querySelector('.page-title')
const characterEl = document.querySelector('.character')
const boxEls = document.querySelectorAll('.box')
const jobEls = document.querySelectorAll('.job')

titleEl.innerHTML = result.title
characterEl.src = result.character
boxEls.forEach(function (boxEl, index){
  boxEl.innerHTML = result.results[index]
})

jobEls.forEach(function(jobEl, index){
  jobEl.innerHTML = result.jobs[index]
})
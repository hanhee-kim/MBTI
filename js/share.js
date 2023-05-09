const btnEl = document.querySelector('.share-or-copy')

// 각 지원 기능 확인!
const isSupportedShare = !!navigator?.share
const isSupportedClipboard = !!navigator?.clipboard
const isSupportedClipboardCommand = document.queryCommandSupported?.('copy')

//이 변수들은 각각 navigator.share, navigator.clipboard, document.queryCommandSupported('copy')
// 프로퍼티가 지원되는 경우 true 값을 갖고, 그렇지 않은 경우 false 값을 가짐

// 공유 및 복사 기능 상태 체크!
const healthEl = document.createElement('div')
//각 기능의 지원 여부를 나타내는 문자열을 담고 있는 div 요소를 생성
healthEl.style.display = 'none'
healthEl.innerHTML = `s: ${isSupportedShare}, c: ${isSupportedClipboard}, cc: ${isSupportedClipboardCommand}`
document.body.append(healthEl)
// startNativeShare() 함수와 copyToClipboard() 함수가
// 각각 navigator.share와 navigator.clipboard.writeText() 메서드를 사용하여 공유 및 복사 기능을 수행하도록 정의


//async : 비동기적인 작업을 수행하는 함수를 정의하기 위한 키워드. function 앞에 위치
// 해당 함수는 항상 프라미스를 반환

// await 사용 : 자바스크립트는 await 키워드를 만나면 프라미스가 처리될 때까지 기다렸다가 결과가 이후에 반환
//프라미스가 처리될 때까지 함수 실행을 기다리게 만든다. 프라미스가 처리되면 그 결과와 함께 실행이 재개
//프라미스가 처리되길 기다리는 동안엔 엔진이 다른 일(다른 스크립트를 실행, 이벤트 처리 등)을 할 수 있기 때문에, CPU 리소스가 낭비되지 않는다.

// 모바일 브라우저 내장 공유 기능!
async function startNativeShare() {
  //
  await navigator.share({
    title: '내 안에 숨어있는 직업캐릭터 찾기!',
    text: '누구나 찰떡인 직업이 있어요! 내 안에 숨어있는 직업캐를 찾아보세요!',
    url: location.href // 현재 페이지 주소!
  })
}

// 주소 복사 기능!
async function copyToClipboard() {
  // 레거시 우선!
  if (isSupportedClipboardCommand) {
    const textarea = document.createElement('textarea')
    textarea.style.position = 'fixed'
    textarea.style.top = 0
    textarea.style.left = 0
    textarea.value = location.href

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    document.execCommand('copy')
    document.body.removeChild(textarea)
    alert('링크를 복사했어요 ><')
    return
  }
  if (isSupportedClipboard) {
    await navigator.clipboard.writeText(location.href)
    alert('링크를 복사했어요 ><')
  }
}

// 모든 기능이 없는 경우 공유 버튼 제거!
if (!isSupportedShare && !isSupportedClipboard && !isSupportedClipboardCommand) {
  btnEl.style.display = 'none'
}

// 공유 버튼을 클릭했을 떄!
btnEl?.addEventListener('click', async function () {
  if (isSupportedShare) {
    await startNativeShare()
    return
  }
  if (isSupportedClipboard || isSupportedClipboardCommand) {
    await copyToClipboard()
  }
})

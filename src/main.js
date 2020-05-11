const $lastLi = $('#addSite')
const xObject = JSON.parse(localStorage.getItem('x'))

const hashMap = xObject || [
    { logo: 'B', url: 'https://www.bilibili.com' },
    { logo: 'W', url: 'https://wallhaven.cc/' },
    { logo: 'T', url: 'https://taobao.com/' },
    { logo: 'J', url: 'https://jd.com' },
    { logo: 'I', url: 'https://iqiyi.com' }
]

function rander() {
    $('.site-list').find('li:not(#addSite)').remove()

    hashMap.map((node, index) => {
        const $li = $(`<li>
        <div class="site">
            <div class='icon-wrapper'>
                ${node.logo}
            </div>
            <div class="link">
                ${removePrefix(node.url)}
            </div>
            <div class='close'>
                <svg class="icon">
                    <use xlink:href="#icon-remove"></use>
                </svg>
            </div>
        </div>
    </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() //阻止事件冒泡
            hashMap.splice(index, 1)
            rander()
        })
    })
}

const removePrefix = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}

rander()

$('#addSite').on('click', () => {
    let inputUrl = window.prompt('Please enter site\'s url：').trim()
    if (inputUrl.indexOf('http') !== 0) {
        inputUrl = 'https://' + inputUrl
    }
    hashMap.push({
        logo: removePrefix(inputUrl)[0].toUpperCase(),
        url: inputUrl
    })
    rander()
})


window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap) //对象转为字符串
    localStorage.setItem('x',string)
}

// $(document).on('keypress',(e)=>{ //只能打开一个匹配到到第一个网址，待优化
//     let {key} = e
//     hashMap.map((node,index)=>{
//         if(hashMap[index].logo.toLocaleLowerCase() === key){
//             window.open(node.url)
//         }
//     })
// })
const ZhihuHotURL = 'https://www.zhihu.com/billboard';
const hotItemRegex =
    /"target".*?"titleArea".*?"text":"(.*?)".*?"link":.*?"url":"(.*?)"/gs;

async function getZhihuHot() {
    const { error, data: hotHtml } = await $http.get({ url: ZhihuHotURL });
    if (error) {
        throw error;
    }
    if (!hotHtml || typeof hotHtml !== 'string') {
        throw new Error(`No readable data from ${ZhihuHotURL}`);
    }
    return [...hotHtml.matchAll(hotItemRegex)].map((item) => ({
        title: eval(`"${item[1].trim()}"`), // eval(`"${str}""`) 是为了转译str中的unicode表达（如："\\u002F"->"/"）
        link: eval(`"${item[2]}"`),
    }));
}

module.exports = getZhihuHot;

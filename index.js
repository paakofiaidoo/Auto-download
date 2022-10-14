const axios = require("axios");
const fs = require("fs");

//https://fulllengthaudiobooks.com/robert-greene-the-laws-of-human-nature-audiobook/

//download file from link and save it in directory
const downloadAudio = async (link, directory) => {
    let resCode = null;
    // @ts-ignore
    const audio = await axios({
        url: link,
        method: "GET",
        responseType: "stream",
    })
        .then((res) => {
            resCode = res.status;
            res.data.pipe(fs.createWriteStream(directory));
        })
        .catch((err) => {
            console.log(err);
        });

    return resCode;
};

//convert number to format 01,02,03
const formatNumber = (num) => {
    if (num < 10) {
        return "0" + num;
    }
    return num;
};

//asyn while loop
const asyncWhile = async (condition, asyncCallback) => {
    //call function if previous call is success
    let isDone = false,
        count = 1;
    const link = "https://ipaudio4.com/wp-content/uploads/BAG/Laws%20of%20Human%20Nature/";
    while (isDone === false) {
        const resCode = await downloadAudio(link + formatNumber(count) + ".mp3", `./THE LAWS OF HUMAN NATURE part ${formatNumber(count)}.mp3`);
        if (resCode !== 200) {
            isDone = true;
        }
        count++;
    }
};
asyncWhile();

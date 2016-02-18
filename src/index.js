import Koa from 'koa';

export function start() {
    const app = new Koa();

    app.listen(process.env.PORT || 3000, function () {
        //log.info
        console.log("http server listenting on %j", this.address().port);
    });
};

import config from './config';

import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';

const log = config.get('log');

import initializeDbConnection from './initializeDbConnection';
initializeDbConnection();

import coViews from 'co-views';
import Router from 'koa-router';
import mount from 'koa-mount';

export function start(options, ...extensions) {
    const app = new Koa();

    this.views = coViews(options.viewsPath || 'views');

    /* index route */
    const indexRouter = Router();
    const baseIndexPaths = ['/', '/index.html'];
    indexRouter.get(baseIndexPaths.concat.apply(baseIndexPaths,
                            (extensions.map(_ => _.indexPaths || []))), async (ctx) => {
        ctx.body = await this.views(options.indexViewFile || 'index.html.ejs', {env: process.env.NODE_ENV});
        ctx.type = 'text/html';
    });
    const app = new Koa();
    app.use(indexRouter.routes());
    /***/

    /* load extension apps */
    extensions.forEach((_) => {
        app.use(mount(_.app));
    });
    /***/

    /* serve common client files */
    app.use(convert(serve(__dirname + '/client')));
    /***/

    app.listen(process.env.PORT || 3000, function () {
        log.info("http server listening on %j", this.address().port);
    });
}



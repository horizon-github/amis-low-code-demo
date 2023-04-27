<template>
    <div class="box" ref="renderBox"></div>
</template>

<script>
import { render as renderSchema } from "amis";
import ReactDOM from "react-dom";
import * as qs from 'qs';
import {
    toast,
    alert,
    confirm
} from 'amis';
import request from '@/utils/request'


export default {
    props: {
        schema: {
            type: String
        }
    },
    data () {
        return {
            theme: 'default'
        }
    },
    mounted() {
        this.initEnv()
        this.schema && ReactDOM.render(renderSchema(JSON.parse(this.schema), {
            theme: this.theme
        }, this.env), this.$refs.renderBox);
    },
    methods: {
        initEnv () {
            this.env = {
                session: 'global',
                updateLocation: this.updateRoute,
                fetcher: ({
                    url,
                    method,
                    data,
                    config,
                    headers
                }) => {
                    config.method = method
                    method === 'get' && data && (config.params = data);
                    data && (config.data = data);
                    return request(url, config);
                }
            }
        },
        updateRoute (location, replace) {
            if (location === 'goBack') {
                return this.$router.go(-1);
            }
            this.$router[replace ? 'replace' : 'push'](this.normalizeLink(location));
        },
        isCancel: (value) => (axios).isCancel(value),
        normalizeLink (to) {
            if (/^\/api\//.test(to)) {
                return to;
            }
            to = to || '';
            const location = window.location;
            if (to && to[0] === '#') {
                to = location.pathname + location.search + to;
            } else if (to && to[0] === '?') {
                to = location.pathname + to;
            }
            const idx = to.indexOf('?');
            const idx2 = to.indexOf('#');
            let pathname =  ~idx ? to.substring(0, idx) : ~idx2 ? to.substring(0, idx2) : to;
            const search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
            const hash = ~idx2 ? to.substring(idx2) : '';
            if (!pathname) {
                pathname = location.pathname;
            }else if (pathname[0] != '/' && !/^https?:\/\//.test(pathname)) {
                const relativeBase = location.pathname;
                const paths = relativeBase.split('/');
                paths.pop();
                let m;
                while ((m = /^\.\.?\//.exec(pathname))) {
                    if (m[0] === '../') {
                        paths.pop();
                    }
                    pathname = pathname.substring(m[0].length);
                }
                pathname = paths.concat(pathname).join('/');
            }
            return pathname + search + hash;
        }
    }
}
</script>
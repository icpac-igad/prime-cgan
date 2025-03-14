/* pako 2.0.4 https://github.com/nodeca/pako @license (MIT AND Zlib) */
export var hdf5 = (() => {
    function d(a, c, b = 0) {
        var e = new Map();
        for (let [f, k] of a.entries()) (a = F.unpack_from('<' + k, c, b)), (b += F.calcsize(k)), 1 == a.length && (a = a[0]), e.set(f, a);
        return e;
    }
    function g(a) {
        a || a();
    }
    function l(a) {
        a = '<' + Array.from(a.values()).join('');
        return F.calcsize(a);
    }
    function n(a, c = 8) {
        return Math.ceil(a / c) * c;
    }
    function h(a) {
        var c = F._is_big_endian(a);
        if (/S/.test(a)) {
            var b = 'getString';
            a = ((a.match(/S(\d*)/) || [])[1] || 1) | 0;
        } else {
            let [, e, f] = a.match(/[<>=!@]?(i|u|f)(\d*)/);
            a = parseInt(f || 4, 10);
            b = 'get' + Y[e] + (8 * a).toFixed();
        }
        return [b, c, a];
    }
    function p(a, c, b = 0, e = !0) {
        a = new Uint8Array(c.slice(b, b + a));
        e || a.reverse();
        return a.reduce((f, k, m) => f + (k << (8 * m)), 0);
    }
    function r(a) {
        let c = a.length;
        for (; 0 <= --c; ) a[c] = 0;
    }
    function y(a, c, b, e, f) {
        this.static_tree = a;
        this.extra_bits = c;
        this.extra_base = b;
        this.elems = e;
        this.max_length = f;
        this.has_stree = a && a.length;
    }
    function E(a, c) {
        this.dyn_tree = a;
        this.max_code = 0;
        this.stat_desc = c;
    }
    function D(a, c, b, e, f) {
        this.good_length = a;
        this.max_lazy = c;
        this.nice_length = b;
        this.max_chain = e;
        this.func = f;
    }
    function H() {
        this.mode = 0;
        this.last = !1;
        this.wrap = 0;
        this.havedict = !1;
        this.total = this.check = this.dmax = this.flags = 0;
        this.head = null;
        this.wnext = this.whave = this.wsize = this.wbits = 0;
        this.window = null;
        this.extra = this.offset = this.length = this.bits = this.hold = 0;
        this.distcode = this.lencode = null;
        this.have = this.ndist = this.nlen = this.ncode = this.distbits = this.lenbits = 0;
        this.next = null;
        this.lens = new Uint16Array(320);
        this.work = new Uint16Array(288);
        this.distdyn = this.lendyn = null;
        this.was = this.back = this.sane = 0;
    }
    function J(a) {
        const c = (this.options = Xa.assign(
            {
                chunkSize: 65536,
                windowBits: 15,
                to: ''
            },
            a || {}
        ));
        c.raw && 0 <= c.windowBits && 16 > c.windowBits && ((c.windowBits = -c.windowBits), 0 === c.windowBits && (c.windowBits = -15));
        !(0 <= c.windowBits && 16 > c.windowBits) || (a && a.windowBits) || (c.windowBits += 32);
        15 < c.windowBits && 48 > c.windowBits && 0 === (c.windowBits & 15) && (c.windowBits |= 15);
        this.err = 0;
        this.msg = '';
        this.ended = !1;
        this.chunks = [];
        this.strm = new gc();
        this.strm.avail_out = 0;
        a = fa.inflateInit2(this.strm, c.windowBits);
        if (a !== pa) throw Error(Ea[a]);
        this.header = new hc();
        fa.inflateGetHeader(this.strm, this.header);
        if (
            c.dictionary &&
            ('string' === typeof c.dictionary ? (c.dictionary = Fa.string2buf(c.dictionary)) : '[object ArrayBuffer]' === Ya.call(c.dictionary) && (c.dictionary = new Uint8Array(c.dictionary)),
            c.raw && ((a = fa.inflateSetDictionary(this.strm, c.dictionary)), a !== pa))
        )
            throw Error(Ea[a]);
    }
    function O(a, c) {
        c = new J(c);
        c.push(a);
        if (c.err) throw c.msg || Ea[c.err];
        return c.result;
    }
    function M(a, c) {
        var b = F.unpack_from('<B', a, c)[0];
        if (1 == b) (b = d(Ga, a, c)), g(1 == b.get('version')), (c += Za);
        else if (2 == b) (b = d(Ha, a, c)), g(2 == b.get('version')), (c += $a);
        else throw "InvalidHDF5File('unknown dataspace message version')";
        b = b.get('dimensionality');
        return F.unpack_from('<' + (2 * b).toFixed() + 'I', a, c).filter(function (e, f) {
            return 0 == f % 2;
        });
    }
    var I = Object.defineProperty,
        N = (a, c, b) => {
            c = 'symbol' !== typeof c ? c + '' : c;
            c in a
                ? I(a, c, {
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                      value: b
                  })
                : (a[c] = b);
            return b;
        },
        ha = {};
    ((a, c) => {
        I(a, '__esModule', {
            value: !0
        });
        for (var b in c)
            I(a, b, {
                get: c[b],
                enumerable: !0
            });
    })(ha, {
        Dataset: () => ab,
        File: () => ic,
        Filters: () => Ia,
        Group: () => xa
    });
    var Y = {
            u: 'Uint',
            i: 'Int',
            f: 'Float'
        },
        F = new (class {
            constructor() {
                const a = new Uint8Array(4);
                this.big_endian = !((new Uint32Array(a.buffer)[0] = 1) & a[0]);
                this.getters = {
                    s: 'getUint8',
                    b: 'getInt8',
                    B: 'getUint8',
                    h: 'getInt16',
                    H: 'getUint16',
                    i: 'getInt32',
                    I: 'getUint32',
                    l: 'getInt32',
                    L: 'getUint32',
                    q: 'getInt64',
                    Q: 'getUint64',
                    f: 'getFloat32',
                    d: 'getFloat64'
                };
                this.byte_lengths = {
                    s: 1,
                    b: 1,
                    B: 1,
                    h: 2,
                    H: 2,
                    i: 4,
                    I: 4,
                    l: 4,
                    L: 4,
                    q: 8,
                    Q: 8,
                    f: 4,
                    d: 8
                };
                this.fmt_size_regex = '(\\d*)([' + Object.keys(this.byte_lengths).join('') + '])';
            }
            calcsize(a) {
                for (var c = 0, b, e = new RegExp(this.fmt_size_regex, 'g'); null !== (b = e.exec(a)); ) {
                    let f = parseInt(b[1] || 1, 10);
                    c += f * this.byte_lengths[b[2]];
                }
                return c;
            }
            _is_big_endian(a) {
                return /^</.test(a) ? !1 : /^(!|>)/.test(a) ? !0 : this.big_endian;
            }
            unpack_from(a, c, b) {
                b = Number(b || 0);
                for (var e = new aa(c, 0), f = [], k = this._is_big_endian(a), m, v = new RegExp(this.fmt_size_regex, 'g'); null !== (m = v.exec(a)); ) {
                    let x = parseInt(m[1] || 1, 10);
                    var w = m[2];
                    m = this.getters[w];
                    let G = this.byte_lengths[w];
                    if ('s' == w) f.push(new TextDecoder().decode(c.slice(b, b + x))), (b += x);
                    else for (w = 0; w < x; w++) f.push(e[m](b, !k)), (b += G);
                }
                return f;
            }
        })(),
        aa = class extends DataView {
            getUint64(a, c) {
                const b = BigInt(this.getUint32(a, c));
                a = BigInt(this.getUint32(a + 4, c));
                return Number(c ? b + (a << 32n) : (b << 32n) + a);
            }
            getInt64(a, c) {
                if (c) {
                    c = this.getUint32(a, !0);
                    var b = this.getInt32(a + 4, !0);
                } else (b = this.getInt32(a, !1)), (c = this.getUint32(a + 4, !1));
                return Number(BigInt(c) + (BigInt(b) << 32n));
            }
            getString(a, c, b) {
                a = this.buffer.slice(a, a + b);
                return new TextDecoder().decode(a);
            }
            getVLENStruct(a, c, b) {
                b = this.getUint32(a, c);
                let e = this.getUint64(a + 4, c);
                a = this.getUint32(a + 12, c);
                return [b, e, a];
            }
        },
        cb = class {
            constructor(a, c) {
                this.buf = a;
                this.offset = c;
                this.dtype = this.determine_dtype();
            }
            determine_dtype() {
                var a = d(bb, this.buf, this.offset);
                this.offset += jc;
                let c = a.get('class_and_version') & 15;
                if (c == kc) return this._determine_dtype_fixed_point(a);
                if (c == lc) return this._determine_dtype_floating_point(a);
                if (c == mc) throw 'Time datatype class not supported.';
                if (c == nc) return this._determine_dtype_string(a);
                if (c == oc) throw 'Bitfield datatype class not supported.';
                if (c == pc) throw 'Opaque datatype class not supported.';
                if (c == qc) return this._determine_dtype_compound(a);
                if (c == rc) return ['REFERENCE', a.get('size')];
                if (c == sc) return this.determine_dtype();
                if (c == tc) throw 'Array datatype class not supported.';
                if (c == uc) return (a = this._determine_dtype_vlen(a)), 'VLEN_SEQUENCE' == a[0] && (a = ['VLEN_SEQUENCE', this.determine_dtype()]), a;
                throw 'Invalid datatype class ' + c;
            }
            _determine_dtype_fixed_point(a) {
                let c = a.get('size');
                if (![1, 2, 4, 8].includes(c)) throw 'Unsupported datatype size';
                var b = 0 < (a.get('class_bit_field_0') & 8) ? 'i' : 'u';
                a = 0 == (a.get('class_bit_field_0') & 1) ? '<' : '>';
                this.offset += 4;
                return a + b + c.toFixed();
            }
            _determine_dtype_floating_point(a) {
                let c = a.get('size');
                if (![1, 2, 4, 8].includes(c)) throw 'Unsupported datatype size';
                a = 0 == (a.get('class_bit_field_0') & 1) ? '<' : '>';
                this.offset += 12;
                return a + 'f' + c.toFixed();
            }
            _determine_dtype_string(a) {
                return 'S' + a.get('size').toFixed();
            }
            _determine_dtype_vlen(a) {
                if (1 != (a.get('class_bit_field_0') & 1)) return ['VLEN_SEQUENCE', 0, 0];
                let c = a.get('class_bit_field_0') >> 4;
                a = a.get('class_bit_field_1') & 1;
                return ['VLEN_STRING', c, a];
            }
            _determine_dtype_compound(a) {
                throw 'Compound type not yet implemented!';
            }
        },
        bb = new Map([
            ['class_and_version', 'B'],
            ['class_bit_field_0', 'B'],
            ['class_bit_field_1', 'B'],
            ['class_bit_field_2', 'B'],
            ['size', 'I']
        ]),
        jc = l(bb),
        vc = new Map([
            ['offset', 'I'],
            ['dimensionality', 'B'],
            ['reserved_0', 'B'],
            ['reserved_1', 'B'],
            ['reserved_2', 'B'],
            ['permutation', 'I'],
            ['reserved_3', 'I'],
            ['dim_size_1', 'I'],
            ['dim_size_2', 'I'],
            ['dim_size_3', 'I'],
            ['dim_size_4', 'I']
        ]);
    l(vc);
    var kc = 0,
        lc = 1,
        mc = 2,
        nc = 3,
        oc = 4,
        pc = 5,
        qc = 6,
        rc = 7,
        sc = 8,
        uc = 9,
        tc = 10,
        Ja = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
        ya = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
        wc = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
        db = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]),
        ia = Array(576);
    r(ia);
    var qa = Array(60);
    r(qa);
    var ka = Array(512);
    r(ka);
    var ra = Array(256);
    r(ra);
    var Ka = Array(29);
    r(Ka);
    var za = Array(30);
    r(za);
    var eb,
        fb,
        gb,
        sa = (a, c) => {
            a.pending_buf[a.pending++] = c & 255;
            a.pending_buf[a.pending++] = (c >>> 8) & 255;
        },
        X = (a, c, b) => {
            a.bi_valid > 16 - b ? ((a.bi_buf |= (c << a.bi_valid) & 65535), sa(a, a.bi_buf), (a.bi_buf = c >> (16 - a.bi_valid)), (a.bi_valid += b - 16)) : ((a.bi_buf |= (c << a.bi_valid) & 65535), (a.bi_valid += b));
        },
        da = (a, c, b) => {
            X(a, b[2 * c], b[2 * c + 1]);
        },
        hb = (a, c) => {
            let b = 0;
            do (b |= a & 1), (a >>>= 1), (b <<= 1);
            while (0 < --c);
            return b >>> 1;
        },
        ib = (a, c, b) => {
            const e = Array(16);
            var f = 0;
            let k;
            for (k = 1; 15 >= k; k++) e[k] = f = (f + b[k - 1]) << 1;
            for (b = 0; b <= c; b++) (f = a[2 * b + 1]), 0 !== f && (a[2 * b] = hb(e[f]++, f));
        },
        jb = (a) => {
            let c;
            for (c = 0; 286 > c; c++) a.dyn_ltree[2 * c] = 0;
            for (c = 0; 30 > c; c++) a.dyn_dtree[2 * c] = 0;
            for (c = 0; 19 > c; c++) a.bl_tree[2 * c] = 0;
            a.dyn_ltree[512] = 1;
            a.opt_len = a.static_len = 0;
            a.last_lit = a.matches = 0;
        },
        kb = (a) => {
            8 < a.bi_valid ? sa(a, a.bi_buf) : 0 < a.bi_valid && (a.pending_buf[a.pending++] = a.bi_buf);
            a.bi_buf = 0;
            a.bi_valid = 0;
        },
        lb = (a, c, b, e) => {
            const f = 2 * c,
                k = 2 * b;
            return a[f] < a[k] || (a[f] === a[k] && e[c] <= e[b]);
        },
        La = (a, c, b) => {
            const e = a.heap[b];
            let f = b << 1;
            for (; f <= a.heap_len; ) {
                f < a.heap_len && lb(c, a.heap[f + 1], a.heap[f], a.depth) && f++;
                if (lb(c, e, a.heap[f], a.depth)) break;
                a.heap[b] = a.heap[f];
                b = f;
                f <<= 1;
            }
            a.heap[b] = e;
        },
        mb = (a, c, b) => {
            let e,
                f,
                k = 0,
                m,
                v;
            if (0 !== a.last_lit) {
                do
                    (e = (a.pending_buf[a.d_buf + 2 * k] << 8) | a.pending_buf[a.d_buf + 2 * k + 1]),
                        (f = a.pending_buf[a.l_buf + k]),
                        k++,
                        0 === e
                            ? da(a, f, c)
                            : ((m = ra[f]), da(a, m + 256 + 1, c), (v = Ja[m]), 0 !== v && ((f -= Ka[m]), X(a, f, v)), e--, (m = 256 > e ? ka[e] : ka[256 + (e >>> 7)]), da(a, m, b), (v = ya[m]), 0 !== v && ((e -= za[m]), X(a, e, v)));
                while (k < a.last_lit);
            }
            da(a, 256, c);
        },
        Ma = (a, c) => {
            const b = c.dyn_tree;
            var e = c.stat_desc.static_tree,
                f = c.stat_desc.has_stree,
                k = c.stat_desc.elems,
                m;
            let v = -1;
            a.heap_len = 0;
            a.heap_max = 573;
            for (m = 0; m < k; m++) 0 !== b[2 * m] ? ((a.heap[++a.heap_len] = v = m), (a.depth[m] = 0)) : (b[2 * m + 1] = 0);
            for (; 2 > a.heap_len; ) {
                var w = (a.heap[++a.heap_len] = 2 > v ? ++v : 0);
                b[2 * w] = 1;
                a.depth[w] = 0;
                a.opt_len--;
                f && (a.static_len -= e[2 * w + 1]);
            }
            c.max_code = v;
            for (m = a.heap_len >> 1; 1 <= m; m--) La(a, b, m);
            w = k;
            do
                (m = a.heap[1]),
                    (a.heap[1] = a.heap[a.heap_len--]),
                    La(a, b, 1),
                    (e = a.heap[1]),
                    (a.heap[--a.heap_max] = m),
                    (a.heap[--a.heap_max] = e),
                    (b[2 * w] = b[2 * m] + b[2 * e]),
                    (a.depth[w] = (a.depth[m] >= a.depth[e] ? a.depth[m] : a.depth[e]) + 1),
                    (b[2 * m + 1] = b[2 * e + 1] = w),
                    (a.heap[1] = w++),
                    La(a, b, 1);
            while (2 <= a.heap_len);
            a.heap[--a.heap_max] = a.heap[1];
            {
                m = c.dyn_tree;
                w = c.max_code;
                e = c.stat_desc.static_tree;
                f = c.stat_desc.has_stree;
                k = c.stat_desc.extra_bits;
                const x = c.stat_desc.extra_base,
                    G = c.stat_desc.max_length;
                let C,
                    A,
                    q,
                    u,
                    t = 0;
                for (A = 0; 15 >= A; A++) a.bl_count[A] = 0;
                m[2 * a.heap[a.heap_max] + 1] = 0;
                for (c = a.heap_max + 1; 573 > c; c++)
                    (C = a.heap[c]),
                        (A = m[2 * m[2 * C + 1] + 1] + 1),
                        A > G && ((A = G), t++),
                        (m[2 * C + 1] = A),
                        C > w || (a.bl_count[A]++, (q = 0), C >= x && (q = k[C - x]), (u = m[2 * C]), (a.opt_len += u * (A + q)), f && (a.static_len += u * (e[2 * C + 1] + q)));
                if (0 !== t) {
                    do {
                        for (A = G - 1; 0 === a.bl_count[A]; ) A--;
                        a.bl_count[A]--;
                        a.bl_count[A + 1] += 2;
                        a.bl_count[G]--;
                        t -= 2;
                    } while (0 < t);
                    for (A = G; 0 !== A; A--) for (C = a.bl_count[A]; 0 !== C; ) (e = a.heap[--c]), e > w || (m[2 * e + 1] !== A && ((a.opt_len += (A - m[2 * e + 1]) * m[2 * e]), (m[2 * e + 1] = A)), C--);
                }
            }
            ib(b, v, a.bl_count);
        },
        nb = (a, c, b) => {
            let e,
                f = -1,
                k,
                m = c[1],
                v = 0,
                w = 7,
                x = 4;
            0 === m && ((w = 138), (x = 3));
            c[2 * (b + 1) + 1] = 65535;
            for (e = 0; e <= b; e++)
                (k = m),
                    (m = c[2 * (e + 1) + 1]),
                    (++v < w && k === m) ||
                        (v < x ? (a.bl_tree[2 * k] += v) : 0 !== k ? (k !== f && a.bl_tree[2 * k]++, a.bl_tree[32]++) : 10 >= v ? a.bl_tree[34]++ : a.bl_tree[36]++,
                        (v = 0),
                        (f = k),
                        0 === m ? ((w = 138), (x = 3)) : k === m ? ((w = 6), (x = 3)) : ((w = 7), (x = 4)));
        },
        ob = (a, c, b) => {
            let e,
                f = -1,
                k,
                m = c[1],
                v = 0,
                w = 7,
                x = 4;
            0 === m && ((w = 138), (x = 3));
            for (e = 0; e <= b; e++)
                if (((k = m), (m = c[2 * (e + 1) + 1]), !(++v < w && k === m))) {
                    if (v < x) {
                        do da(a, k, a.bl_tree);
                        while (0 !== --v);
                    } else 0 !== k ? (k !== f && (da(a, k, a.bl_tree), v--), da(a, 16, a.bl_tree), X(a, v - 3, 2)) : 10 >= v ? (da(a, 17, a.bl_tree), X(a, v - 3, 3)) : (da(a, 18, a.bl_tree), X(a, v - 11, 7));
                    v = 0;
                    f = k;
                    0 === m ? ((w = 138), (x = 3)) : k === m ? ((w = 6), (x = 3)) : ((w = 7), (x = 4));
                }
        },
        xc = (a) => {
            let c = 4093624447,
                b;
            for (b = 0; 31 >= b; b++, c >>>= 1) if (c & 1 && 0 !== a.dyn_ltree[2 * b]) return 0;
            if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return 1;
            for (b = 32; 256 > b; b++) if (0 !== a.dyn_ltree[2 * b]) return 1;
            return 0;
        },
        pb = !1,
        qb = (a, c, b, e) => {
            X(a, e ? 1 : 0, 3);
            kb(a);
            sa(a, b);
            sa(a, ~b);
            a.pending_buf.set(a.window.subarray(c, c + b), a.pending);
            a.pending += b;
        },
        yc = {
            _tr_init: (a) => {
                if (!pb) {
                    var c, b;
                    let e;
                    const f = Array(16);
                    for (e = b = 0; 28 > e; e++) for (Ka[e] = b, c = 0; c < 1 << Ja[e]; c++) ra[b++] = e;
                    ra[b - 1] = e;
                    for (e = b = 0; 16 > e; e++) for (za[e] = b, c = 0; c < 1 << ya[e]; c++) ka[b++] = e;
                    for (b >>= 7; 30 > e; e++) for (za[e] = b << 7, c = 0; c < 1 << (ya[e] - 7); c++) ka[256 + b++] = e;
                    for (c = 0; 15 >= c; c++) f[c] = 0;
                    for (c = 0; 143 >= c; ) (ia[2 * c + 1] = 8), c++, f[8]++;
                    for (; 255 >= c; ) (ia[2 * c + 1] = 9), c++, f[9]++;
                    for (; 279 >= c; ) (ia[2 * c + 1] = 7), c++, f[7]++;
                    for (; 287 >= c; ) (ia[2 * c + 1] = 8), c++, f[8]++;
                    ib(ia, 287, f);
                    for (c = 0; 30 > c; c++) (qa[2 * c + 1] = 5), (qa[2 * c] = hb(c, 5));
                    eb = new y(ia, Ja, 257, 286, 15);
                    fb = new y(qa, ya, 0, 30, 15);
                    gb = new y([], wc, 0, 19, 7);
                    pb = !0;
                }
                a.l_desc = new E(a.dyn_ltree, eb);
                a.d_desc = new E(a.dyn_dtree, fb);
                a.bl_desc = new E(a.bl_tree, gb);
                a.bi_buf = 0;
                a.bi_valid = 0;
                jb(a);
            },
            _tr_stored_block: qb,
            _tr_flush_block: (a, c, b, e) => {
                let f;
                var k = 0;
                if (0 < a.level) {
                    2 === a.strm.data_type && (a.strm.data_type = xc(a));
                    Ma(a, a.l_desc);
                    Ma(a, a.d_desc);
                    nb(a, a.dyn_ltree, a.l_desc.max_code);
                    nb(a, a.dyn_dtree, a.d_desc.max_code);
                    Ma(a, a.bl_desc);
                    for (k = 18; 3 <= k && 0 === a.bl_tree[2 * db[k] + 1]; k--);
                    a.opt_len += 3 * (k + 1) + 14;
                    var m = (a.opt_len + 3 + 7) >>> 3;
                    f = (a.static_len + 3 + 7) >>> 3;
                    f <= m && (m = f);
                } else m = f = b + 5;
                if (b + 4 <= m && -1 !== c) qb(a, c, b, e);
                else if (4 === a.strategy || f === m) X(a, 2 + (e ? 1 : 0), 3), mb(a, ia, qa);
                else {
                    X(a, 4 + (e ? 1 : 0), 3);
                    c = a.l_desc.max_code + 1;
                    b = a.d_desc.max_code + 1;
                    k += 1;
                    X(a, c - 257, 5);
                    X(a, b - 1, 5);
                    X(a, k - 4, 4);
                    for (m = 0; m < k; m++) X(a, a.bl_tree[2 * db[m] + 1], 3);
                    ob(a, a.dyn_ltree, c - 1);
                    ob(a, a.dyn_dtree, b - 1);
                    mb(a, a.dyn_ltree, a.dyn_dtree);
                }
                jb(a);
                e && kb(a);
            },
            _tr_tally: (a, c, b) => {
                a.pending_buf[a.d_buf + 2 * a.last_lit] = (c >>> 8) & 255;
                a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = c & 255;
                a.pending_buf[a.l_buf + a.last_lit] = b & 255;
                a.last_lit++;
                0 === c ? a.dyn_ltree[2 * b]++ : (a.matches++, c--, a.dyn_ltree[2 * (ra[b] + 256 + 1)]++, a.dyn_dtree[2 * (256 > c ? ka[c] : ka[256 + (c >>> 7)])]++);
                return a.last_lit === a.lit_bufsize - 1;
            },
            _tr_align: (a) => {
                X(a, 2, 3);
                da(a, 256, ia);
                16 === a.bi_valid ? (sa(a, a.bi_buf), (a.bi_buf = 0), (a.bi_valid = 0)) : 8 <= a.bi_valid && ((a.pending_buf[a.pending++] = a.bi_buf & 255), (a.bi_buf >>= 8), (a.bi_valid -= 8));
            }
        },
        Aa = (a, c, b, e) => {
            let f = (a & 65535) | 0;
            a = ((a >>> 16) & 65535) | 0;
            let k;
            for (; 0 !== b; ) {
                k = 2e3 < b ? 2e3 : b;
                b -= k;
                do (f = (f + c[e++]) | 0), (a = (a + f) | 0);
                while (--k);
                f %= 65521;
                a %= 65521;
            }
            return f | (a << 16) | 0;
        },
        zc = new Uint32Array(
            (() => {
                let a,
                    c = [];
                for (var b = 0; 256 > b; b++) {
                    a = b;
                    for (var e = 0; 8 > e; e++) a = a & 1 ? 3988292384 ^ (a >>> 1) : a >>> 1;
                    c[b] = a;
                }
                return c;
            })()
        ),
        ba = (a, c, b, e) => {
            b = e + b;
            for (a ^= -1; e < b; e++) a = (a >>> 8) ^ zc[(a ^ c[e]) & 255];
            return a ^ -1;
        },
        Ea = {
            2: 'need dictionary',
            1: 'stream end',
            0: '',
            '-1': 'file error',
            '-2': 'stream error',
            '-3': 'data error',
            '-4': 'insufficient memory',
            '-5': 'buffer error',
            '-6': 'incompatible version'
        },
        Ba = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        },
        { _tr_flush_block: Ac, _tr_tally: ta } = yc,
        { Z_NO_FLUSH: Na, Z_FINISH: Oa, Z_FILTERED: Bc } = Ba,
        ca = (a, c) => {
            Ac(a, 0 <= a.block_start ? a.block_start : -1, a.strstart - a.block_start, c);
            a.block_start = a.strstart;
            a = a.strm;
            c = a.state;
            let b = c.pending;
            b > a.avail_out && (b = a.avail_out);
            0 !== b && (a.output.set(c.pending_buf.subarray(c.pending_out, c.pending_out + b), a.next_out), (a.next_out += b), (c.pending_out += b), (a.total_out += b), (a.avail_out -= b), (c.pending -= b), 0 === c.pending && (c.pending_out = 0));
        },
        rb = (a, c) => {
            let b = a.max_chain_length,
                e = a.strstart;
            let f = a.prev_length,
                k = a.nice_match;
            const m = a.strstart > a.w_size - 262 ? a.strstart - (a.w_size - 262) : 0,
                v = a.window,
                w = a.w_mask,
                x = a.prev,
                G = a.strstart + 258;
            let C = v[e + f - 1],
                A = v[e + f];
            a.prev_length >= a.good_match && (b >>= 2);
            k > a.lookahead && (k = a.lookahead);
            do {
                var q = c;
                if (v[q + f] === A && v[q + f - 1] === C && v[q] === v[e] && v[++q] === v[e + 1]) {
                    e += 2;
                    for (q++; v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && v[++e] === v[++q] && e < G; );
                    q = 258 - (G - e);
                    e = G - 258;
                    if (q > f) {
                        a.match_start = c;
                        f = q;
                        if (q >= k) break;
                        C = v[e + f - 1];
                        A = v[e + f];
                    }
                }
            } while ((c = x[c & w]) > m && 0 !== --b);
            return f <= a.lookahead ? f : a.lookahead;
        },
        Pa = (a) => {
            const c = a.w_size;
            var b;
            do {
                var e = a.window_size - a.lookahead - a.strstart;
                if (a.strstart >= c + (c - 262)) {
                    a.window.set(a.window.subarray(c, c + c), 0);
                    a.match_start -= c;
                    a.strstart -= c;
                    a.block_start -= c;
                    var f = (b = a.hash_size);
                    do {
                        var k = a.head[--f];
                        a.head[f] = k >= c ? k - c : 0;
                    } while (--b);
                    f = b = c;
                    do (k = a.prev[--f]), (a.prev[f] = k >= c ? k - c : 0);
                    while (--b);
                    e += c;
                }
                if (0 === a.strm.avail_in) break;
                {
                    f = a.strm;
                    b = a.window;
                    k = a.strstart + a.lookahead;
                    let m = f.avail_in;
                    m > e && (m = e);
                    0 === m
                        ? (b = 0)
                        : ((f.avail_in -= m),
                          b.set(f.input.subarray(f.next_in, f.next_in + m), k),
                          1 === f.state.wrap ? (f.adler = Aa(f.adler, b, m, k)) : 2 === f.state.wrap && (f.adler = ba(f.adler, b, m, k)),
                          (f.next_in += m),
                          (f.total_in += m),
                          (b = m));
                }
                a.lookahead += b;
                if (3 <= a.lookahead + a.insert)
                    for (
                        e = a.strstart - a.insert, a.ins_h = a.window[e], a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[e + 1]) & a.hash_mask;
                        a.insert && !((a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[e + 3 - 1]) & a.hash_mask), (a.prev[e & a.w_mask] = a.head[a.ins_h]), (a.head[a.ins_h] = e), e++, a.insert--, 3 > a.lookahead + a.insert);

                    );
            } while (262 > a.lookahead && 0 !== a.strm.avail_in);
        },
        Qa = (a, c) => {
            for (var b; ; ) {
                if (262 > a.lookahead) {
                    Pa(a);
                    if (262 > a.lookahead && c === Na) return 1;
                    if (0 === a.lookahead) break;
                }
                b = 0;
                3 <= a.lookahead && ((a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[a.strstart + 3 - 1]) & a.hash_mask), (b = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h]), (a.head[a.ins_h] = a.strstart));
                0 !== b && a.strstart - b <= a.w_size - 262 && (a.match_length = rb(a, b));
                if (3 <= a.match_length)
                    if (((b = ta(a, a.strstart - a.match_start, a.match_length - 3)), (a.lookahead -= a.match_length), a.match_length <= a.max_lazy_match && 3 <= a.lookahead)) {
                        a.match_length--;
                        do a.strstart++, (a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[a.strstart + 3 - 1]) & a.hash_mask), (a.prev[a.strstart & a.w_mask] = a.head[a.ins_h]), (a.head[a.ins_h] = a.strstart);
                        while (0 !== --a.match_length);
                        a.strstart++;
                    } else (a.strstart += a.match_length), (a.match_length = 0), (a.ins_h = a.window[a.strstart]), (a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[a.strstart + 1]) & a.hash_mask);
                else (b = ta(a, 0, a.window[a.strstart])), a.lookahead--, a.strstart++;
                if (b && (ca(a, !1), 0 === a.strm.avail_out)) return 1;
            }
            a.insert = 2 > a.strstart ? a.strstart : 2;
            return c === Oa ? (ca(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (ca(a, !1), 0 === a.strm.avail_out) ? 1 : 2;
        },
        oa = (a, c) => {
            let b;
            for (;;) {
                if (262 > a.lookahead) {
                    Pa(a);
                    if (262 > a.lookahead && c === Na) return 1;
                    if (0 === a.lookahead) break;
                }
                var e = 0;
                3 <= a.lookahead && ((a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[a.strstart + 3 - 1]) & a.hash_mask), (e = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h]), (a.head[a.ins_h] = a.strstart));
                a.prev_length = a.match_length;
                a.prev_match = a.match_start;
                a.match_length = 2;
                0 !== e &&
                    a.prev_length < a.max_lazy_match &&
                    a.strstart - e <= a.w_size - 262 &&
                    ((a.match_length = rb(a, e)), 5 >= a.match_length && (a.strategy === Bc || (3 === a.match_length && 4096 < a.strstart - a.match_start)) && (a.match_length = 2));
                if (3 <= a.prev_length && a.match_length <= a.prev_length) {
                    b = a.strstart + a.lookahead - 3;
                    e = ta(a, a.strstart - 1 - a.prev_match, a.prev_length - 3);
                    a.lookahead -= a.prev_length - 1;
                    a.prev_length -= 2;
                    do ++a.strstart <= b && ((a.ins_h = ((a.ins_h << a.hash_shift) ^ a.window[a.strstart + 3 - 1]) & a.hash_mask), (a.prev[a.strstart & a.w_mask] = a.head[a.ins_h]), (a.head[a.ins_h] = a.strstart));
                    while (0 !== --a.prev_length);
                    a.match_available = 0;
                    a.match_length = 2;
                    a.strstart++;
                    if (e && (ca(a, !1), 0 === a.strm.avail_out)) return 1;
                } else if (a.match_available) {
                    if (((e = ta(a, 0, a.window[a.strstart - 1])) && ca(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out)) return 1;
                } else (a.match_available = 1), a.strstart++, a.lookahead--;
            }
            a.match_available && (ta(a, 0, a.window[a.strstart - 1]), (a.match_available = 0));
            a.insert = 2 > a.strstart ? a.strstart : 2;
            return c === Oa ? (ca(a, !0), 0 === a.strm.avail_out ? 3 : 4) : a.last_lit && (ca(a, !1), 0 === a.strm.avail_out) ? 1 : 2;
        };
    new D(0, 0, 0, 0, (a, c) => {
        let b = 65535;
        for (b > a.pending_buf_size - 5 && (b = a.pending_buf_size - 5); ; ) {
            if (1 >= a.lookahead) {
                Pa(a);
                if (0 === a.lookahead && c === Na) return 1;
                if (0 === a.lookahead) break;
            }
            a.strstart += a.lookahead;
            a.lookahead = 0;
            const e = a.block_start + b;
            if (0 === a.strstart || a.strstart >= e) if (((a.lookahead = a.strstart - e), (a.strstart = e), ca(a, !1), 0 === a.strm.avail_out)) return 1;
            if (a.strstart - a.block_start >= a.w_size - 262 && (ca(a, !1), 0 === a.strm.avail_out)) return 1;
        }
        a.insert = 0;
        if (c === Oa) return ca(a, !0), 0 === a.strm.avail_out ? 3 : 4;
        a.strstart > a.block_start && ca(a, !1);
        return 1;
    });
    new D(4, 4, 8, 4, Qa);
    new D(4, 5, 16, 8, Qa);
    new D(4, 6, 32, 32, Qa);
    new D(4, 4, 16, 16, oa);
    new D(8, 16, 32, 32, oa);
    new D(8, 16, 128, 128, oa);
    new D(8, 32, 128, 256, oa);
    new D(32, 128, 258, 1024, oa);
    new D(32, 258, 258, 4096, oa);
    var Xa = {
            assign: function (a) {
                const c = Array.prototype.slice.call(arguments, 1);
                for (; c.length; ) {
                    const b = c.shift();
                    if (b) {
                        if ('object' !== typeof b) throw new TypeError(b + 'must be non-object');
                        for (const e in b) Object.prototype.hasOwnProperty.call(b, e) && (a[e] = b[e]);
                    }
                }
                return a;
            },
            flattenChunks: (a) => {
                var c = 0;
                for (let b = 0, e = a.length; b < e; b++) c += a[b].length;
                c = new Uint8Array(c);
                for (let b = 0, e = 0, f = a.length; b < f; b++) {
                    let k = a[b];
                    c.set(k, e);
                    e += k.length;
                }
                return c;
            }
        },
        sb = !0;
    try {
        String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (a) {
        sb = !1;
    }
    var ua = new Uint8Array(256);
    for (let a = 0; 256 > a; a++) ua[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
    ua[254] = ua[254] = 1;
    var Fa = {
            string2buf: (a) => {
                if ('function' === typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(a);
                let c,
                    b,
                    e,
                    f,
                    k,
                    m = a.length,
                    v = 0;
                for (f = 0; f < m; f++)
                    (b = a.charCodeAt(f)), 55296 === (b & 64512) && f + 1 < m && ((e = a.charCodeAt(f + 1)), 56320 === (e & 64512) && ((b = 65536 + ((b - 55296) << 10) + (e - 56320)), f++)), (v += 128 > b ? 1 : 2048 > b ? 2 : 65536 > b ? 3 : 4);
                c = new Uint8Array(v);
                for (f = k = 0; k < v; f++)
                    (b = a.charCodeAt(f)),
                        55296 === (b & 64512) && f + 1 < m && ((e = a.charCodeAt(f + 1)), 56320 === (e & 64512) && ((b = 65536 + ((b - 55296) << 10) + (e - 56320)), f++)),
                        128 > b
                            ? (c[k++] = b)
                            : (2048 > b ? (c[k++] = 192 | (b >>> 6)) : (65536 > b ? (c[k++] = 224 | (b >>> 12)) : ((c[k++] = 240 | (b >>> 18)), (c[k++] = 128 | ((b >>> 12) & 63))), (c[k++] = 128 | ((b >>> 6) & 63))), (c[k++] = 128 | (b & 63)));
                return c;
            },
            buf2string: (a, c) => {
                var b = c || a.length;
                if ('function' === typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(a.subarray(0, c));
                var e;
                let f;
                c = Array(2 * b);
                for (e = f = 0; e < b; ) {
                    let k = a[e++];
                    if (128 > k) {
                        c[f++] = k;
                        continue;
                    }
                    let m = ua[k];
                    if (4 < m) (c[f++] = 65533), (e += m - 1);
                    else {
                        for (k &= 2 === m ? 31 : 3 === m ? 15 : 7; 1 < m && e < b; ) (k = (k << 6) | (a[e++] & 63)), m--;
                        1 < m ? (c[f++] = 65533) : 65536 > k ? (c[f++] = k) : ((k -= 65536), (c[f++] = 55296 | ((k >> 10) & 1023)), (c[f++] = 56320 | (k & 1023)));
                    }
                }
                a = f;
                if (65534 > a && c.subarray && sb) c = String.fromCharCode.apply(null, c.length === a ? c : c.subarray(0, a));
                else {
                    b = '';
                    for (e = 0; e < a; e++) b += String.fromCharCode(c[e]);
                    c = b;
                }
                return c;
            },
            utf8border: (a, c) => {
                c = c || a.length;
                c > a.length && (c = a.length);
                let b = c - 1;
                for (; 0 <= b && 128 === (a[b] & 192); ) b--;
                return 0 > b || 0 === b ? c : b + ua[a[b]] > c ? b : c;
            }
        },
        gc = function () {
            this.input = null;
            this.total_in = this.avail_in = this.next_in = 0;
            this.output = null;
            this.total_out = this.avail_out = this.next_out = 0;
            this.msg = '';
            this.state = null;
            this.data_type = 2;
            this.adler = 0;
        },
        Cc = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
        Dc = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
        Ec = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
        Fc = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]),
        va = (a, c, b, e, f, k, m, v) => {
            var w = v.bits;
            let x, G, C, A;
            var q;
            let u,
                t,
                B,
                z,
                P,
                K,
                T,
                U = 0,
                L;
            const Q = new Uint16Array(16);
            var S = new Uint16Array(16);
            let ea,
                la = 0,
                ja,
                ma,
                R;
            for (x = 0; 15 >= x; x++) Q[x] = 0;
            for (G = 0; G < e; G++) Q[c[b + G]]++;
            A = w;
            for (C = 15; 1 <= C && 0 === Q[C]; C--);
            A > C && (A = C);
            if (0 === C) return (f[k++] = 20971520), (f[k++] = 20971520), (v.bits = 1), 0;
            for (w = 1; w < C && 0 === Q[w]; w++);
            A < w && (A = w);
            for (x = q = 1; 15 >= x; x++) if (((q <<= 1), (q -= Q[x]), 0 > q)) return -1;
            if (0 < q && (0 === a || 1 !== C)) return -1;
            S[1] = 0;
            for (x = 1; 15 > x; x++) S[x + 1] = S[x] + Q[x];
            for (G = 0; G < e; G++) 0 !== c[b + G] && (m[S[c[b + G]]++] = G);
            0 === a ? ((T = ea = m), (L = 19)) : 1 === a ? ((T = Cc), (U -= 257), (ea = Dc), (la -= 257), (L = 256)) : ((T = Ec), (ea = Fc), (L = -1));
            G = t = 0;
            x = w;
            K = k;
            e = A;
            S = 0;
            z = -1;
            u = 1 << A;
            P = u - 1;
            if ((1 === a && 852 < u) || (2 === a && 592 < u)) return 1;
            for (;;) {
                ja = x - S;
                m[G] < L ? ((ma = 0), (R = m[G])) : m[G] > L ? ((ma = ea[la + m[G]]), (R = T[U + m[G]])) : ((ma = 96), (R = 0));
                q = 1 << (x - S);
                w = B = 1 << e;
                do (B -= q), (f[K + (t >> S) + B] = (ja << 24) | (ma << 16) | R | 0);
                while (0 !== B);
                for (q = 1 << (x - 1); t & q; ) q >>= 1;
                0 !== q ? ((t &= q - 1), (t += q)) : (t = 0);
                G++;
                if (0 === --Q[x]) {
                    if (x === C) break;
                    x = c[b + m[G]];
                }
                if (x > A && (t & P) !== z) {
                    0 === S && (S = A);
                    K += w;
                    e = x - S;
                    for (q = 1 << e; e + S < C; ) {
                        q -= Q[e + S];
                        if (0 >= q) break;
                        e++;
                        q <<= 1;
                    }
                    u += 1 << e;
                    if ((1 === a && 852 < u) || (2 === a && 592 < u)) return 1;
                    z = t & P;
                    f[z] = (A << 24) | (e << 16) | (K - k) | 0;
                }
            }
            0 !== t && (f[K + t] = ((x - S) << 24) | 4194304);
            v.bits = A;
            return 0;
        },
        { Z_FINISH: tb, Z_BLOCK: Gc, Z_TREES: Ca, Z_OK: na, Z_STREAM_END: Hc, Z_NEED_DICT: Ic, Z_STREAM_ERROR: Z, Z_DATA_ERROR: ub, Z_MEM_ERROR: vb, Z_BUF_ERROR: Jc, Z_DEFLATED: wb } = Ba,
        xb = (a) => {
            if (!a || !a.state) return Z;
            const c = a.state;
            a.total_in = a.total_out = c.total = 0;
            a.msg = '';
            c.wrap && (a.adler = c.wrap & 1);
            c.mode = 1;
            c.last = 0;
            c.havedict = 0;
            c.dmax = 32768;
            c.head = null;
            c.hold = 0;
            c.bits = 0;
            c.lencode = c.lendyn = new Int32Array(852);
            c.distcode = c.distdyn = new Int32Array(592);
            c.sane = 1;
            c.back = -1;
            return na;
        },
        yb = (a) => {
            if (!a || !a.state) return Z;
            const c = a.state;
            c.wsize = 0;
            c.whave = 0;
            c.wnext = 0;
            return xb(a);
        },
        zb = (a, c) => {
            let b;
            if (!a || !a.state) return Z;
            const e = a.state;
            0 > c ? ((b = 0), (c = -c)) : ((b = (c >> 4) + 1), 48 > c && (c &= 15));
            if (c && (8 > c || 15 < c)) return Z;
            null !== e.window && e.wbits !== c && (e.window = null);
            e.wrap = b;
            e.wbits = c;
            return yb(a);
        },
        Ab = (a, c) => {
            if (!a) return Z;
            const b = new H();
            a.state = b;
            b.window = null;
            c = zb(a, c);
            c !== na && (a.state = null);
            return c;
        },
        Bb = !0,
        Ra,
        Sa,
        Cb = (a, c, b, e) => {
            const f = a.state;
            null === f.window && ((f.wsize = 1 << f.wbits), (f.wnext = 0), (f.whave = 0), (f.window = new Uint8Array(f.wsize)));
            e >= f.wsize
                ? (f.window.set(c.subarray(b - f.wsize, b), 0), (f.wnext = 0), (f.whave = f.wsize))
                : ((a = f.wsize - f.wnext),
                  a > e && (a = e),
                  f.window.set(c.subarray(b - e, b - e + a), f.wnext),
                  (e -= a) ? (f.window.set(c.subarray(b - e, b), 0), (f.wnext = e), (f.whave = f.wsize)) : ((f.wnext += a), f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += a)));
            return 0;
        },
        fa = {
            inflateReset: yb,
            inflateReset2: zb,
            inflateResetKeep: xb,
            inflateInit: (a) => Ab(a, 15),
            inflateInit2: Ab,
            inflate: (a, c) => {
                let b;
                let e, f;
                let k;
                const m = new Uint8Array(4),
                    v = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
                if (!a || !a.state || !a.output || (!a.input && 0 !== a.avail_in)) return Z;
                b = a.state;
                12 === b.mode && (b.mode = 13);
                var w = a.next_out;
                var x = a.output;
                var G = a.avail_out;
                var C = a.next_in;
                var A = a.input;
                var q = a.avail_in;
                var u = b.hold;
                var t = b.bits;
                e = q;
                f = G;
                k = na;
                a: for (;;)
                    switch (b.mode) {
                        case 1:
                            if (0 === b.wrap) {
                                b.mode = 13;
                                break;
                            }
                            for (; 16 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            if (b.wrap & 2 && 35615 === u) {
                                b.check = 0;
                                m[0] = u & 255;
                                m[1] = (u >>> 8) & 255;
                                b.check = ba(b.check, m, 2, 0);
                                t = u = 0;
                                b.mode = 2;
                                break;
                            }
                            b.flags = 0;
                            b.head && (b.head.done = !1);
                            if (!(b.wrap & 1) || (((u & 255) << 8) + (u >> 8)) % 31) {
                                a.msg = 'incorrect header check';
                                b.mode = 30;
                                break;
                            }
                            if ((u & 15) !== wb) {
                                a.msg = 'unknown compression method';
                                b.mode = 30;
                                break;
                            }
                            u >>>= 4;
                            t -= 4;
                            var B = (u & 15) + 8;
                            if (0 === b.wbits) b.wbits = B;
                            else if (B > b.wbits) {
                                a.msg = 'invalid window size';
                                b.mode = 30;
                                break;
                            }
                            b.dmax = 1 << b.wbits;
                            a.adler = b.check = 1;
                            b.mode = u & 512 ? 10 : 12;
                            t = u = 0;
                            break;
                        case 2:
                            for (; 16 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            b.flags = u;
                            if ((b.flags & 255) !== wb) {
                                a.msg = 'unknown compression method';
                                b.mode = 30;
                                break;
                            }
                            if (b.flags & 57344) {
                                a.msg = 'unknown header flags set';
                                b.mode = 30;
                                break;
                            }
                            b.head && (b.head.text = (u >> 8) & 1);
                            b.flags & 512 && ((m[0] = u & 255), (m[1] = (u >>> 8) & 255), (b.check = ba(b.check, m, 2, 0)));
                            t = u = 0;
                            b.mode = 3;
                        case 3:
                            for (; 32 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            b.head && (b.head.time = u);
                            b.flags & 512 && ((m[0] = u & 255), (m[1] = (u >>> 8) & 255), (m[2] = (u >>> 16) & 255), (m[3] = (u >>> 24) & 255), (b.check = ba(b.check, m, 4, 0)));
                            t = u = 0;
                            b.mode = 4;
                        case 4:
                            for (; 16 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            b.head && ((b.head.xflags = u & 255), (b.head.os = u >> 8));
                            b.flags & 512 && ((m[0] = u & 255), (m[1] = (u >>> 8) & 255), (b.check = ba(b.check, m, 2, 0)));
                            t = u = 0;
                            b.mode = 5;
                        case 5:
                            if (b.flags & 1024) {
                                for (; 16 > t; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                b.length = u;
                                b.head && (b.head.extra_len = u);
                                b.flags & 512 && ((m[0] = u & 255), (m[1] = (u >>> 8) & 255), (b.check = ba(b.check, m, 2, 0)));
                                t = u = 0;
                            } else b.head && (b.head.extra = null);
                            b.mode = 6;
                        case 6:
                            if (b.flags & 1024) {
                                var z = b.length;
                                z > q && (z = q);
                                z &&
                                    (b.head && ((B = b.head.extra_len - b.length), b.head.extra || (b.head.extra = new Uint8Array(b.head.extra_len)), b.head.extra.set(A.subarray(C, C + z), B)),
                                    b.flags & 512 && (b.check = ba(b.check, A, z, C)),
                                    (q -= z),
                                    (C += z),
                                    (b.length -= z));
                                if (b.length) break a;
                            }
                            b.length = 0;
                            b.mode = 7;
                        case 7:
                            if (b.flags & 2048) {
                                if (0 === q) break a;
                                z = 0;
                                do (B = A[C + z++]), b.head && B && 65536 > b.length && (b.head.name += String.fromCharCode(B));
                                while (B && z < q);
                                b.flags & 512 && (b.check = ba(b.check, A, z, C));
                                q -= z;
                                C += z;
                                if (B) break a;
                            } else b.head && (b.head.name = null);
                            b.length = 0;
                            b.mode = 8;
                        case 8:
                            if (b.flags & 4096) {
                                if (0 === q) break a;
                                z = 0;
                                do (B = A[C + z++]), b.head && B && 65536 > b.length && (b.head.comment += String.fromCharCode(B));
                                while (B && z < q);
                                b.flags & 512 && (b.check = ba(b.check, A, z, C));
                                q -= z;
                                C += z;
                                if (B) break a;
                            } else b.head && (b.head.comment = null);
                            b.mode = 9;
                        case 9:
                            if (b.flags & 512) {
                                for (; 16 > t; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                if (u !== (b.check & 65535)) {
                                    a.msg = 'header crc mismatch';
                                    b.mode = 30;
                                    break;
                                }
                                t = u = 0;
                            }
                            b.head && ((b.head.hcrc = (b.flags >> 9) & 1), (b.head.done = !0));
                            a.adler = b.check = 0;
                            b.mode = 12;
                            break;
                        case 10:
                            for (; 32 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            a.adler = b.check = ((u >>> 24) & 255) + ((u >>> 8) & 65280) + ((u & 65280) << 8) + ((u & 255) << 24);
                            t = u = 0;
                            b.mode = 11;
                        case 11:
                            if (0 === b.havedict) return (a.next_out = w), (a.avail_out = G), (a.next_in = C), (a.avail_in = q), (b.hold = u), (b.bits = t), Ic;
                            a.adler = b.check = 1;
                            b.mode = 12;
                        case 12:
                            if (c === Gc || c === Ca) break a;
                        case 13:
                            if (b.last) {
                                u >>>= t & 7;
                                t -= t & 7;
                                b.mode = 27;
                                break;
                            }
                            for (; 3 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            b.last = u & 1;
                            u >>>= 1;
                            --t;
                            switch (u & 3) {
                                case 0:
                                    b.mode = 14;
                                    break;
                                case 1:
                                    z = b;
                                    if (Bb) {
                                        Ra = new Int32Array(512);
                                        Sa = new Int32Array(32);
                                        for (B = 0; 144 > B; ) z.lens[B++] = 8;
                                        for (; 256 > B; ) z.lens[B++] = 9;
                                        for (; 280 > B; ) z.lens[B++] = 7;
                                        for (; 288 > B; ) z.lens[B++] = 8;
                                        va(1, z.lens, 0, 288, Ra, 0, z.work, {
                                            bits: 9
                                        });
                                        for (B = 0; 32 > B; ) z.lens[B++] = 5;
                                        va(2, z.lens, 0, 32, Sa, 0, z.work, {
                                            bits: 5
                                        });
                                        Bb = !1;
                                    }
                                    z.lencode = Ra;
                                    z.lenbits = 9;
                                    z.distcode = Sa;
                                    z.distbits = 5;
                                    b.mode = 20;
                                    if (c === Ca) {
                                        u >>>= 2;
                                        t -= 2;
                                        break a;
                                    }
                                    break;
                                case 2:
                                    b.mode = 17;
                                    break;
                                case 3:
                                    (a.msg = 'invalid block type'), (b.mode = 30);
                            }
                            u >>>= 2;
                            t -= 2;
                            break;
                        case 14:
                            u >>>= t & 7;
                            for (t -= t & 7; 32 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            if ((u & 65535) !== ((u >>> 16) ^ 65535)) {
                                a.msg = 'invalid stored block lengths';
                                b.mode = 30;
                                break;
                            }
                            b.length = u & 65535;
                            t = u = 0;
                            b.mode = 15;
                            if (c === Ca) break a;
                        case 15:
                            b.mode = 16;
                        case 16:
                            if ((z = b.length)) {
                                z > q && (z = q);
                                z > G && (z = G);
                                if (0 === z) break a;
                                x.set(A.subarray(C, C + z), w);
                                q -= z;
                                C += z;
                                G -= z;
                                w += z;
                                b.length -= z;
                                break;
                            }
                            b.mode = 12;
                            break;
                        case 17:
                            for (; 14 > t; ) {
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            b.nlen = (u & 31) + 257;
                            u >>>= 5;
                            t -= 5;
                            b.ndist = (u & 31) + 1;
                            u >>>= 5;
                            t -= 5;
                            b.ncode = (u & 15) + 4;
                            u >>>= 4;
                            t -= 4;
                            if (286 < b.nlen || 30 < b.ndist) {
                                a.msg = 'too many length or distance symbols';
                                b.mode = 30;
                                break;
                            }
                            b.have = 0;
                            b.mode = 18;
                        case 18:
                            for (; b.have < b.ncode; ) {
                                for (; 3 > t; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                b.lens[v[b.have++]] = u & 7;
                                u >>>= 3;
                                t -= 3;
                            }
                            for (; 19 > b.have; ) b.lens[v[b.have++]] = 0;
                            b.lencode = b.lendyn;
                            b.lenbits = 7;
                            z = {
                                bits: b.lenbits
                            };
                            k = va(0, b.lens, 0, 19, b.lencode, 0, b.work, z);
                            b.lenbits = z.bits;
                            if (k) {
                                a.msg = 'invalid code lengths set';
                                b.mode = 30;
                                break;
                            }
                            b.have = 0;
                            b.mode = 19;
                        case 19:
                            for (; b.have < b.nlen + b.ndist; ) {
                                for (;;) {
                                    var P = b.lencode[u & ((1 << b.lenbits) - 1)];
                                    z = P >>> 24;
                                    P &= 65535;
                                    if (z <= t) break;
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                if (16 > P) (u >>>= z), (t -= z), (b.lens[b.have++] = P);
                                else {
                                    if (16 === P) {
                                        for (B = z + 2; t < B; ) {
                                            if (0 === q) break a;
                                            q--;
                                            u += A[C++] << t;
                                            t += 8;
                                        }
                                        u >>>= z;
                                        t -= z;
                                        if (0 === b.have) {
                                            a.msg = 'invalid bit length repeat';
                                            b.mode = 30;
                                            break;
                                        }
                                        B = b.lens[b.have - 1];
                                        z = 3 + (u & 3);
                                        u >>>= 2;
                                        t -= 2;
                                    } else if (17 === P) {
                                        for (B = z + 3; t < B; ) {
                                            if (0 === q) break a;
                                            q--;
                                            u += A[C++] << t;
                                            t += 8;
                                        }
                                        u >>>= z;
                                        t -= z;
                                        B = 0;
                                        z = 3 + (u & 7);
                                        u >>>= 3;
                                        t -= 3;
                                    } else {
                                        for (B = z + 7; t < B; ) {
                                            if (0 === q) break a;
                                            q--;
                                            u += A[C++] << t;
                                            t += 8;
                                        }
                                        u >>>= z;
                                        t -= z;
                                        B = 0;
                                        z = 11 + (u & 127);
                                        u >>>= 7;
                                        t -= 7;
                                    }
                                    if (b.have + z > b.nlen + b.ndist) {
                                        a.msg = 'invalid bit length repeat';
                                        b.mode = 30;
                                        break;
                                    }
                                    for (; z--; ) b.lens[b.have++] = B;
                                }
                            }
                            if (30 === b.mode) break;
                            if (0 === b.lens[256]) {
                                a.msg = 'invalid code -- missing end-of-block';
                                b.mode = 30;
                                break;
                            }
                            b.lenbits = 9;
                            z = {
                                bits: b.lenbits
                            };
                            k = va(1, b.lens, 0, b.nlen, b.lencode, 0, b.work, z);
                            b.lenbits = z.bits;
                            if (k) {
                                a.msg = 'invalid literal/lengths set';
                                b.mode = 30;
                                break;
                            }
                            b.distbits = 6;
                            b.distcode = b.distdyn;
                            z = {
                                bits: b.distbits
                            };
                            k = va(2, b.lens, b.nlen, b.ndist, b.distcode, 0, b.work, z);
                            b.distbits = z.bits;
                            if (k) {
                                a.msg = 'invalid distances set';
                                b.mode = 30;
                                break;
                            }
                            b.mode = 20;
                            if (c === Ca) break a;
                        case 20:
                            b.mode = 21;
                        case 21:
                            if (6 <= q && 258 <= G) {
                                a.next_out = w;
                                a.avail_out = G;
                                a.next_in = C;
                                a.avail_in = q;
                                b.hold = u;
                                b.bits = t;
                                var K = void 0;
                                let Q, S, ea, la, ja, ma, R, wa, W;
                                A = a;
                                const V = A.state;
                                W = A.next_in;
                                C = A.input;
                                wa = W + (A.avail_in - 5);
                                R = A.next_out;
                                x = A.output;
                                ma = R - (f - A.avail_out);
                                ja = R + (A.avail_out - 257);
                                la = V.dmax;
                                ea = V.wsize;
                                P = V.whave;
                                var T = V.wnext;
                                var U = V.window;
                                var L = V.hold;
                                B = V.bits;
                                z = V.lencode;
                                t = V.distcode;
                                u = (1 << V.lenbits) - 1;
                                G = (1 << V.distbits) - 1;
                                b: do
                                    c: for (15 > B && ((L += C[W++] << B), (B += 8), (L += C[W++] << B), (B += 8)), K = z[L & u]; ; ) {
                                        q = K >>> 24;
                                        L >>>= q;
                                        B -= q;
                                        q = (K >>> 16) & 255;
                                        if (0 === q) x[R++] = K & 65535;
                                        else if (q & 16) {
                                            w = K & 65535;
                                            if ((q &= 15)) B < q && ((L += C[W++] << B), (B += 8)), (w += L & ((1 << q) - 1)), (L >>>= q), (B -= q);
                                            15 > B && ((L += C[W++] << B), (B += 8), (L += C[W++] << B), (B += 8));
                                            K = t[L & G];
                                            d: for (;;) {
                                                q = K >>> 24;
                                                L >>>= q;
                                                B -= q;
                                                q = (K >>> 16) & 255;
                                                if (q & 16) {
                                                    S = K & 65535;
                                                    q &= 15;
                                                    B < q && ((L += C[W++] << B), (B += 8), B < q && ((L += C[W++] << B), (B += 8)));
                                                    S += L & ((1 << q) - 1);
                                                    if (S > la) {
                                                        A.msg = 'invalid distance too far back';
                                                        V.mode = 30;
                                                        break b;
                                                    }
                                                    L >>>= q;
                                                    B -= q;
                                                    q = R - ma;
                                                    if (S > q) {
                                                        q = S - q;
                                                        if (q > P && V.sane) {
                                                            A.msg = 'invalid distance too far back';
                                                            V.mode = 30;
                                                            break b;
                                                        }
                                                        Q = 0;
                                                        K = U;
                                                        if (0 === T) {
                                                            if (((Q += ea - q), q < w)) {
                                                                w -= q;
                                                                do x[R++] = U[Q++];
                                                                while (--q);
                                                                Q = R - S;
                                                                K = x;
                                                            }
                                                        } else if (T < q) {
                                                            if (((Q += ea + T - q), (q -= T), q < w)) {
                                                                w -= q;
                                                                do x[R++] = U[Q++];
                                                                while (--q);
                                                                Q = 0;
                                                                if (T < w) {
                                                                    q = T;
                                                                    w -= q;
                                                                    do x[R++] = U[Q++];
                                                                    while (--q);
                                                                    Q = R - S;
                                                                    K = x;
                                                                }
                                                            }
                                                        } else if (((Q += T - q), q < w)) {
                                                            w -= q;
                                                            do x[R++] = U[Q++];
                                                            while (--q);
                                                            Q = R - S;
                                                            K = x;
                                                        }
                                                        for (; 2 < w; ) (x[R++] = K[Q++]), (x[R++] = K[Q++]), (x[R++] = K[Q++]), (w -= 3);
                                                        w && ((x[R++] = K[Q++]), 1 < w && (x[R++] = K[Q++]));
                                                    } else {
                                                        Q = R - S;
                                                        do (x[R++] = x[Q++]), (x[R++] = x[Q++]), (x[R++] = x[Q++]), (w -= 3);
                                                        while (2 < w);
                                                        w && ((x[R++] = x[Q++]), 1 < w && (x[R++] = x[Q++]));
                                                    }
                                                } else if (0 === (q & 64)) {
                                                    K = t[(K & 65535) + (L & ((1 << q) - 1))];
                                                    continue d;
                                                } else {
                                                    A.msg = 'invalid distance code';
                                                    V.mode = 30;
                                                    break b;
                                                }
                                                break;
                                            }
                                        } else if (0 === (q & 64)) {
                                            K = z[(K & 65535) + (L & ((1 << q) - 1))];
                                            continue c;
                                        } else {
                                            q & 32 ? (V.mode = 12) : ((A.msg = 'invalid literal/length code'), (V.mode = 30));
                                            break b;
                                        }
                                        break;
                                    }
                                while (W < wa && R < ja);
                                w = B >> 3;
                                W -= w;
                                B -= w << 3;
                                A.next_in = W;
                                A.next_out = R;
                                A.avail_in = W < wa ? 5 + (wa - W) : 5 - (W - wa);
                                A.avail_out = R < ja ? 257 + (ja - R) : 257 - (R - ja);
                                V.hold = L & ((1 << B) - 1);
                                V.bits = B;
                                w = a.next_out;
                                x = a.output;
                                G = a.avail_out;
                                C = a.next_in;
                                A = a.input;
                                q = a.avail_in;
                                u = b.hold;
                                t = b.bits;
                                12 === b.mode && (b.back = -1);
                                break;
                            }
                            for (b.back = 0; ; ) {
                                P = b.lencode[u & ((1 << b.lenbits) - 1)];
                                z = P >>> 24;
                                B = (P >>> 16) & 255;
                                P &= 65535;
                                if (z <= t) break;
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            if (B && 0 === (B & 240)) {
                                L = z;
                                U = B;
                                for (T = P; ; ) {
                                    P = b.lencode[T + ((u & ((1 << (L + U)) - 1)) >> L)];
                                    z = P >>> 24;
                                    B = (P >>> 16) & 255;
                                    P &= 65535;
                                    if (L + z <= t) break;
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                u >>>= L;
                                t -= L;
                                b.back += L;
                            }
                            u >>>= z;
                            t -= z;
                            b.back += z;
                            b.length = P;
                            if (0 === B) {
                                b.mode = 26;
                                break;
                            }
                            if (B & 32) {
                                b.back = -1;
                                b.mode = 12;
                                break;
                            }
                            if (B & 64) {
                                a.msg = 'invalid literal/length code';
                                b.mode = 30;
                                break;
                            }
                            b.extra = B & 15;
                            b.mode = 22;
                        case 22:
                            if (b.extra) {
                                for (B = b.extra; t < B; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                b.length += u & ((1 << b.extra) - 1);
                                u >>>= b.extra;
                                t -= b.extra;
                                b.back += b.extra;
                            }
                            b.was = b.length;
                            b.mode = 23;
                        case 23:
                            for (;;) {
                                P = b.distcode[u & ((1 << b.distbits) - 1)];
                                z = P >>> 24;
                                B = (P >>> 16) & 255;
                                P &= 65535;
                                if (z <= t) break;
                                if (0 === q) break a;
                                q--;
                                u += A[C++] << t;
                                t += 8;
                            }
                            if (0 === (B & 240)) {
                                L = z;
                                U = B;
                                for (T = P; ; ) {
                                    P = b.distcode[T + ((u & ((1 << (L + U)) - 1)) >> L)];
                                    z = P >>> 24;
                                    B = (P >>> 16) & 255;
                                    P &= 65535;
                                    if (L + z <= t) break;
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                u >>>= L;
                                t -= L;
                                b.back += L;
                            }
                            u >>>= z;
                            t -= z;
                            b.back += z;
                            if (B & 64) {
                                a.msg = 'invalid distance code';
                                b.mode = 30;
                                break;
                            }
                            b.offset = P;
                            b.extra = B & 15;
                            b.mode = 24;
                        case 24:
                            if (b.extra) {
                                for (B = b.extra; t < B; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                b.offset += u & ((1 << b.extra) - 1);
                                u >>>= b.extra;
                                t -= b.extra;
                                b.back += b.extra;
                            }
                            if (b.offset > b.dmax) {
                                a.msg = 'invalid distance too far back';
                                b.mode = 30;
                                break;
                            }
                            b.mode = 25;
                        case 25:
                            if (0 === G) break a;
                            z = f - G;
                            if (b.offset > z) {
                                z = b.offset - z;
                                if (z > b.whave && b.sane) {
                                    a.msg = 'invalid distance too far back';
                                    b.mode = 30;
                                    break;
                                }
                                z > b.wnext ? ((z -= b.wnext), (B = b.wsize - z)) : (B = b.wnext - z);
                                z > b.length && (z = b.length);
                                L = b.window;
                            } else (L = x), (B = w - b.offset), (z = b.length);
                            z > G && (z = G);
                            G -= z;
                            b.length -= z;
                            do x[w++] = L[B++];
                            while (--z);
                            0 === b.length && (b.mode = 21);
                            break;
                        case 26:
                            if (0 === G) break a;
                            x[w++] = b.length;
                            G--;
                            b.mode = 21;
                            break;
                        case 27:
                            if (b.wrap) {
                                for (; 32 > t; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u |= A[C++] << t;
                                    t += 8;
                                }
                                f -= G;
                                a.total_out += f;
                                b.total += f;
                                f && (a.adler = b.check = b.flags ? ba(b.check, x, f, w - f) : Aa(b.check, x, f, w - f));
                                f = G;
                                if ((b.flags ? u : ((u >>> 24) & 255) + ((u >>> 8) & 65280) + ((u & 65280) << 8) + ((u & 255) << 24)) !== b.check) {
                                    a.msg = 'incorrect data check';
                                    b.mode = 30;
                                    break;
                                }
                                t = u = 0;
                            }
                            b.mode = 28;
                        case 28:
                            if (b.wrap && b.flags) {
                                for (; 32 > t; ) {
                                    if (0 === q) break a;
                                    q--;
                                    u += A[C++] << t;
                                    t += 8;
                                }
                                if (u !== (b.total & 4294967295)) {
                                    a.msg = 'incorrect length check';
                                    b.mode = 30;
                                    break;
                                }
                                t = u = 0;
                            }
                            b.mode = 29;
                        case 29:
                            k = Hc;
                            break a;
                        case 30:
                            k = ub;
                            break a;
                        case 31:
                            return vb;
                        default:
                            return Z;
                    }
                a.next_out = w;
                a.avail_out = G;
                a.next_in = C;
                a.avail_in = q;
                b.hold = u;
                b.bits = t;
                (b.wsize || (f !== a.avail_out && 30 > b.mode && (27 > b.mode || c !== tb))) && Cb(a, a.output, a.next_out, f - a.avail_out);
                e -= a.avail_in;
                f -= a.avail_out;
                a.total_in += e;
                a.total_out += f;
                b.total += f;
                b.wrap && f && (a.adler = b.check = b.flags ? ba(b.check, x, f, a.next_out - f) : Aa(b.check, x, f, a.next_out - f));
                a.data_type = b.bits + (b.last ? 64 : 0) + (12 === b.mode ? 128 : 0) + (20 === b.mode || 15 === b.mode ? 256 : 0);
                ((0 === e && 0 === f) || c === tb) && k === na && (k = Jc);
                return k;
            },
            inflateEnd: (a) => {
                if (!a || !a.state) return Z;
                let c = a.state;
                c.window && (c.window = null);
                a.state = null;
                return na;
            },
            inflateGetHeader: (a, c) => {
                if (!a || !a.state) return Z;
                a = a.state;
                if (0 === (a.wrap & 2)) return Z;
                a.head = c;
                c.done = !1;
                return na;
            },
            inflateSetDictionary: (a, c) => {
                const b = c.length;
                let e, f;
                if (!a || !a.state) return Z;
                e = a.state;
                if (0 !== e.wrap && 11 !== e.mode) return Z;
                if (11 === e.mode && ((f = Aa(1, c, b, 0)), f !== e.check)) return ub;
                if (Cb(a, c, b, b)) return (e.mode = 31), vb;
                e.havedict = 1;
                return na;
            },
            inflateInfo: 'pako inflate (from Nodeca project)'
        },
        hc = function () {
            this.os = this.xflags = this.time = this.text = 0;
            this.extra = null;
            this.extra_len = 0;
            this.comment = this.name = '';
            this.hcrc = 0;
            this.done = !1;
        },
        Ya = Object.prototype.toString,
        { Z_NO_FLUSH: Kc, Z_FINISH: Lc, Z_OK: pa, Z_STREAM_END: Ta, Z_NEED_DICT: Ua, Z_STREAM_ERROR: Mc, Z_DATA_ERROR: Db, Z_MEM_ERROR: Nc } = Ba;
    J.prototype.push = function (a, c) {
        const b = this.strm,
            e = this.options.chunkSize,
            f = this.options.dictionary;
        let k, m;
        if (this.ended) return !1;
        k = c === ~~c ? c : !0 === c ? Lc : Kc;
        '[object ArrayBuffer]' === Ya.call(a) ? (b.input = new Uint8Array(a)) : (b.input = a);
        b.next_in = 0;
        for (b.avail_in = b.input.length; ; ) {
            0 === b.avail_out && ((b.output = new Uint8Array(e)), (b.next_out = 0), (b.avail_out = e));
            c = fa.inflate(b, k);
            c === Ua && f && ((c = fa.inflateSetDictionary(b, f)), c === pa ? (c = fa.inflate(b, k)) : c === Db && (c = Ua));
            for (; 0 < b.avail_in && c === Ta && 0 < b.state.wrap && 0 !== a[b.next_in]; ) fa.inflateReset(b), (c = fa.inflate(b, k));
            switch (c) {
                case Mc:
                case Db:
                case Ua:
                case Nc:
                    return this.onEnd(c), (this.ended = !0), !1;
            }
            m = b.avail_out;
            if (b.next_out && (0 === b.avail_out || c === Ta))
                if ('string' === this.options.to) {
                    let v = Fa.utf8border(b.output, b.next_out),
                        w = b.next_out - v,
                        x = Fa.buf2string(b.output, v);
                    b.next_out = w;
                    b.avail_out = e - w;
                    w && b.output.set(b.output.subarray(v, v + w), 0);
                    this.onData(x);
                } else this.onData(b.output.length === b.next_out ? b.output : b.output.subarray(0, b.next_out));
            if (c !== pa || 0 !== m) {
                if (c === Ta) {
                    c = fa.inflateEnd(this.strm);
                    this.onEnd(c);
                    this.ended = !0;
                    break;
                }
                if (0 === b.avail_in) break;
            }
        }
        return !0;
    };
    J.prototype.onData = function (a) {
        this.chunks.push(a);
    };
    J.prototype.onEnd = function (a) {
        a === pa && (this.result = 'string' === this.options.to ? this.chunks.join('') : Xa.flattenChunks(this.chunks));
        this.chunks = [];
        this.err = a;
        this.msg = this.strm.msg;
    };
    var { inflate: Oc } = {
            Inflate: J,
            inflate: O,
            inflateRaw: function (a, c) {
                c = c || {};
                c.raw = !0;
                return O(a, c);
            },
            ungzip: O,
            constants: Ba
        },
        Ia = new Map([
            [
                1,
                function (a, c) {
                    a = new Uint8Array(a);
                    return Oc(a).buffer;
                }
            ],
            [
                2,
                function (a, c) {
                    var b = a.byteLength;
                    let e = new Uint8Array(b);
                    b = Math.floor(b / c);
                    a = new DataView(a);
                    for (var f = 0; f < c; f++) for (var k = 0; k < b; k++) e[f + k * c] = a.getUint8(f * b + k);
                    return e.buffer;
                }
            ],
            [
                3,
                function (a, c) {
                    var b = 0 != a.byteLength % 2;
                    c = a.byteLength - 4;
                    for (var e = new DataView(a), f = 0, k = 0, m = 0; m < c - 1; m += 2) {
                        let x = e.getUint16(m, !0);
                        f = (f + x) % 65535;
                        k = (k + f) % 65535;
                    }
                    b && ((b = e.getUint8(c - 1)), (f = (f + b) % 65535), (k = (k + f) % 65535));
                    var [v, w] = F.unpack_from('>HH', a, c);
                    if (f != v % 65535 || k != w % 65535) throw 'ValueError("fletcher32 checksum invalid")';
                    return a.slice(0, -4);
                }
            ]
        ]),
        Eb = class {
            constructor(a, c) {
                this.fh = a;
                this.offset = c;
                this.depth = null;
            }
            init() {
                this.all_nodes = new Map();
                this._read_root_node();
                this._read_children();
            }
            _read_children() {
                let a = this.depth;
                for (; 0 < a; ) {
                    for (var c of this.all_nodes.get(a)) for (var b of c.get('addresses')) this._add_node(this._read_node(b, a - 1));
                    a--;
                }
            }
            _read_root_node() {
                let a = this._read_node(this.offset, null);
                this._add_node(a);
                this.depth = a.get('node_level');
            }
            _add_node(a) {
                let c = a.get('node_level');
                this.all_nodes.has(c) ? this.all_nodes.get(c).push(a) : this.all_nodes.set(c, [a]);
            }
            _read_node(a, c) {
                a = this._read_node_header(a, c);
                a.set('keys', []);
                a.set('addresses', []);
                return a;
            }
            _read_node_header(a) {
                throw 'NotImplementedError: must define _read_node_header in implementation class';
            }
        },
        Fb = class extends Eb {
            constructor() {
                super(...arguments);
                N(
                    this,
                    'B_LINK_NODE',
                    new Map([
                        ['signature', '4s'],
                        ['node_type', 'B'],
                        ['node_level', 'B'],
                        ['entries_used', 'H'],
                        ['left_sibling', 'Q'],
                        ['right_sibling', 'Q']
                    ])
                );
            }
            _read_node_header(a, c) {
                a = d(this.B_LINK_NODE, this.fh, a);
                if (null != c && a.get('node_level') != c) throw 'node level does not match';
                return a;
            }
        },
        Pc = class extends Fb {
            constructor(a, c) {
                super(a, c);
                N(this, 'NODE_TYPE', 0);
                this.init();
            }
            _read_node(a, c) {
                c = this._read_node_header(a, c);
                a += l(this.B_LINK_NODE);
                let b = [],
                    e = [],
                    f = c.get('entries_used');
                for (var k = 0; k < f; k++) {
                    let m = F.unpack_from('<Q', this.fh, a)[0];
                    a += 8;
                    let v = F.unpack_from('<Q', this.fh, a)[0];
                    a += 8;
                    b.push(m);
                    e.push(v);
                }
                b.push(F.unpack_from('<Q', this.fh, a)[0]);
                c.set('keys', b);
                c.set('addresses', e);
                return c;
            }
            symbol_table_addresses() {
                var a = [],
                    c = this.all_nodes.get(0),
                    b;
                for (b of c) a = a.concat(b.get('addresses'));
                return a;
            }
        },
        Qc = class extends Fb {
            constructor(a, c, b) {
                super(a, c);
                N(this, 'NODE_TYPE', 1);
                this.dims = b;
                this.init();
            }
            _read_node(a, c) {
                c = this._read_node_header(a, c);
                a += l(this.B_LINK_NODE);
                var b = [],
                    e = [];
                let f = c.get('entries_used');
                for (var k = 0; k < f; k++) {
                    let [w, x] = F.unpack_from('<II', this.fh, a);
                    a += 8;
                    var m = '<' + this.dims.toFixed() + 'Q',
                        v = F.calcsize(m);
                    m = F.unpack_from(m, this.fh, a);
                    a += v;
                    v = F.unpack_from('<Q', this.fh, a)[0];
                    a += 8;
                    b.push(
                        new Map([
                            ['chunk_size', w],
                            ['filter_mask', x],
                            ['chunk_offset', m]
                        ])
                    );
                    e.push(v);
                }
                c.set('keys', b);
                c.set('addresses', e);
                return c;
            }
            construct_data_from_chunks(a, c, b, e) {
                if (b instanceof Array) {
                    var f = b[0];
                    if ('REFERENCE' == f) {
                        if (8 != b[1]) throw "NotImplementedError('Unsupported Reference type')";
                        b = '<u8';
                        b = 'getUint64';
                        f = !1;
                        var k = 8;
                    } else if ('VLEN_STRING' == f || 'VLEN_SEQUENCE' == f) (b = 'getVLENStruct'), (f = !1), (k = 16);
                    else throw "NotImplementedError('datatype not implemented')";
                } else [b, f, k] = h(b);
                var m = c.reduce(function (T, U) {
                        return T * U;
                    }, 1),
                    v = a.reduce(function (T, U) {
                        return T * U;
                    }, 1);
                let w = c.length;
                var x = 1;
                a.slice().map(function (T) {
                    let U = x;
                    x *= T;
                    return U;
                });
                x = 1;
                var G = c
                    .slice()
                    .reverse()
                    .map(function (T) {
                        let U = x;
                        x *= T;
                        return U;
                    })
                    .reverse();
                m = Array(m);
                let C = v * k;
                for (var A of this.all_nodes.get(0)) {
                    let T = A.get('keys'),
                        U = A.get('addresses'),
                        L = T.length;
                    for (var q = 0; q < L; q++) {
                        var u = T[q],
                            t = U[q];
                        if (null == e) var B = this.fh.slice(t, t + C);
                        else (B = this.fh.slice(t, t + u.get('chunk_size'))), (t = u.get('filter_mask')), (B = this._filter_chunk(B, t, e, k));
                        u = u.get('chunk_offset').slice();
                        t = u.slice();
                        var z = t.map(function () {
                            return 0;
                        });
                        B = new aa(B);
                        for (var P = 0; P < v; P++) {
                            for (var K = w - 1; 0 <= K; K--)
                                if (z[K] >= a[K]) (z[K] = 0), (t[K] = u[K]), 0 < K && ((z[K - 1] += 1), (t[K - 1] += 1));
                                else break;
                            if (
                                t.slice(0, -1).every(function (Q, S) {
                                    return Q < c[S];
                                })
                            ) {
                                K = B[b](P * k, !f, k);
                                let Q = t.slice(0, -1).reduce(function (S, ea, la) {
                                    return ea * G[la] + S;
                                }, 0);
                                m[Q] = K;
                            }
                            z[w - 1] += 1;
                            t[w - 1] += 1;
                        }
                    }
                }
                return m;
            }
            _filter_chunk(a, c, b, e) {
                var f = b.length;
                a = a.slice();
                for (--f; 0 <= f; f--) {
                    if (c & (1 << f)) continue;
                    var k = b[f];
                    let m = k.get('filter_id');
                    k = k.get('client_data');
                    if (Ia.has(m)) a = Ia.get(m)(a, e, k);
                    else throw 'NotImplementedError("Filter with id:' + m.toFixed() + ' not supported")';
                }
                return a;
            }
        },
        Gb = class extends Eb {
            constructor(a, c) {
                super(a, c);
                N(
                    this,
                    'B_TREE_HEADER',
                    new Map([
                        ['signature', '4s'],
                        ['version', 'B'],
                        ['node_type', 'B'],
                        ['node_size', 'I'],
                        ['record_size', 'H'],
                        ['depth', 'H'],
                        ['split_percent', 'B'],
                        ['merge_percent', 'B'],
                        ['root_address', 'Q'],
                        ['root_nrecords', 'H'],
                        ['total_nrecords', 'Q']
                    ])
                );
                N(
                    this,
                    'B_LINK_NODE',
                    new Map([
                        ['signature', '4s'],
                        ['version', 'B'],
                        ['node_type', 'B']
                    ])
                );
                this.init();
            }
            _read_root_node() {
                var a = this._read_tree_header(this.offset);
                this.address_formats = this._calculate_address_formats(a);
                this.header = a;
                this.depth = a.get('depth');
                a = [a.get('root_address'), a.get('root_nrecords'), a.get('total_nrecords')];
                a = this._read_node(a, this.depth);
                this._add_node(a);
            }
            _read_tree_header(a) {
                return d(this.B_TREE_HEADER, this.fh, this.offset);
            }
            _calculate_address_formats(a) {
                let c = a.get('node_size'),
                    b = a.get('record_size'),
                    e = 0,
                    f = 0,
                    k = new Map();
                a = a.get('depth');
                for (var m = 0; m <= a; m++) {
                    let v = '',
                        w = '',
                        x = '',
                        G,
                        C,
                        A;
                    0 == m
                        ? (A = C = G = 0)
                        : 1 == m
                          ? ((G = 8), (v = '<Q'), (C = this._required_bytes(e)), (w = this._int_format(C)), (A = 0))
                          : ((G = 8), (v = '<Q'), (C = this._required_bytes(e)), (w = this._int_format(C)), (A = this._required_bytes(f)), (x = this._int_format(A)));
                    k.set(m, [G, C, A, v, w, x]);
                    m < a && ((e = this._nrecords_max(c, b, G + C + A)), (f = 0 < f ? f * e : e));
                }
                return k;
            }
            _nrecords_max(a, c, b) {
                return Math.floor((a - 10 - b) / (c + b));
            }
            _required_bytes(a) {
                return Math.ceil(a.toString(2).length / 8);
            }
            _int_format(a) {
                return ['<B', '<H', '<I', '<Q'][a - 1];
            }
            _read_node(a, c) {
                let [b, e] = a;
                a = this._read_node_header(b, c);
                b += l(this.B_LINK_NODE);
                var f = this.header.get('record_size');
                let k = [];
                for (var m = 0; m < e; m++) {
                    var v = this._parse_record(this.fh, b, f);
                    b += f;
                    k.push(v);
                }
                f = [];
                m = this.address_formats.get(c);
                if (0 != c) {
                    let [w, x, G, C, A, q] = m;
                    for (c = 0; c <= e; c++) {
                        m = F.unpack_from(C, this.fh, b)[0];
                        b += w;
                        v = F.unpack_from(A, this.fh, b)[0];
                        b += x;
                        let u = v;
                        0 < G && (u = F.unpack_from(q, this.fh, b)[0]);
                        f.push([m, v, u]);
                    }
                }
                a.set('keys', k);
                a.set('addresses', f);
                return a;
            }
            _read_node_header(a, c) {
                a = d(this.B_LINK_NODE, this.fh, a);
                a.set('node_level', c);
                return a;
            }
            *iter_records() {
                for (let a of this.all_nodes.values()) for (let c of a) for (let b of c.get('keys')) yield b;
            }
            _parse_record(a) {
                throw 'NotImplementedError';
            }
        },
        Rc = class extends Gb {
            constructor() {
                super(...arguments);
                N(this, 'NODE_TYPE', 5);
            }
            _parse_record(a, c, b) {
                b = F.unpack_from('<I', a, c)[0];
                c += 4;
                return new Map([
                    ['namehash', b],
                    ['heapid', a.slice(c, c + 7)]
                ]);
            }
        },
        Sc = class extends Gb {
            constructor() {
                super(...arguments);
                N(this, 'NODE_TYPE', 6);
            }
            _parse_record(a, c, b) {
                b = F.unpack_from('<Q', a, c)[0];
                c += 8;
                return new Map([
                    ['creationorder', b],
                    ['heapid', a.slice(c, c + 7)]
                ]);
            }
        },
        Wc = class {
            constructor(a, c) {
                var b = F.unpack_from('<B', a, c + 8);
                if (0 == b) (b = d(Hb, a, c)), (this._end_of_sblock = c + Tc);
                else if (2 == b || 3 == b) (b = d(Ib, a, c)), (this._end_of_sblock = c + Uc);
                else throw 'unsupported superblock version: ' + b.toFixed();
                if (b.get('format_signature') != Vc) throw 'Incorrect file signature: ' + b.get('format_signature');
                if (8 != b.get('offset_size') || 8 != b.get('length_size')) throw 'File uses non-64-bit addressing';
                this.version = b.get('superblock_version');
                this._contents = b;
                this._root_symbol_table = null;
                this._fh = a;
            }
            get offset_to_dataobjects() {
                if (0 == this.version) {
                    var a = new Jb(this._fh, this._end_of_sblock, !0);
                    this._root_symbol_table = a;
                    return a.group_offset;
                }
                if (2 == this.version || 3 == this.version) return this._contents.get('root_group_address');
                throw 'Not implemented version = ' + this.version.toFixed();
            }
        },
        Yc = class {
            constructor(a, c) {
                c = d(Xc, a, c);
                g('HEAP' == c.get('signature'));
                g(0 == c.get('version'));
                let b = c.get('address_of_data_segment');
                a = a.slice(b, b + c.get('data_segment_size'));
                c.set('heap_data', a);
                this._contents = c;
                this.data = a;
            }
            get_object_name(a) {
                let c = new Uint8Array(this.data).indexOf(0, a);
                return F.unpack_from('<' + (c - a).toFixed() + 's', this.data, a)[0];
            }
        },
        Jb = class {
            constructor(a, c, b = !1) {
                if (b) var e = new Map([['symbols', 1]]);
                else {
                    e = d(Kb, a, c);
                    if ('SNOD' != e.get('signature')) throw 'incorrect node type';
                    c += Zc;
                }
                for (var f = [], k = e.get('symbols'), m = 0; m < k; m++) f.push(d(Lb, a, c)), (c += $c);
                b && (this.group_offset = f[0].get('object_header_address'));
                this.entries = f;
                this._contents = e;
            }
            assign_name(a) {
                this.entries.forEach(function (c) {
                    var b = c.get('link_name_offset');
                    b = a.get_object_name(b);
                    c.set('link_name', b);
                });
            }
            get_links(a) {
                var c = {};
                this.entries.forEach(function (b) {
                    var e = b.get('cache_type');
                    let f = b.get('link_name');
                    if (0 == e || 1 == e) c[f] = b.get('object_header_address');
                    else if (2 == e) {
                        e = b.get('scratch');
                        let k = new ArrayBuffer(4),
                            m = new Uint8Array(k);
                        for (b = 0; 4 > b; b++) m[b] = e.charCodeAt(b);
                        b = F.unpack_from('<I', k, 0)[0];
                        c[f] = a.get_object_name(b);
                    }
                });
                return c;
            }
        },
        Qb = class {
            constructor(a, c) {
                let b = d(Mb, a, c);
                c += Nb;
                let e = b.get('collection_size') - Nb;
                this.heap_data = a.slice(c, c + e);
                this._header = b;
                this._objects = null;
            }
            get objects() {
                if (null == this._objects) {
                    this._objects = new Map();
                    for (var a = 0; a <= this.heap_data.byteLength - Ob; ) {
                        let c = d(Pb, this.heap_data, a);
                        if (0 == c.get('object_index')) break;
                        a += Ob;
                        let b = this.heap_data.slice(a, a + c.get('object_size'));
                        this._objects.set(c.get('object_index'), b);
                        a += n(c.get('object_size'));
                    }
                }
                return this._objects;
            }
        },
        ad = class {
            constructor(a, c) {
                this.fh = a;
                let b = d(Rb, a, c);
                c += l(Rb);
                g('FRHP' == b.get('signature'));
                g(0 == b.get('version'));
                if (0 < b.get('filter_info_size')) throw 'Filter info size not supported on FractalHeap';
                if (b.get('btree_address_huge_objects') == Da) b.set('btree_address_huge_objects', null);
                else throw 'Huge objects not implemented in FractalHeap';
                b.get('root_block_address') == Da && b.set('root_block_address', null);
                c = b.get('log2_maximum_heap_size');
                var e = this._min_size_nbits(c);
                e = new Map([
                    ['signature', '4s'],
                    ['version', 'B'],
                    ['heap_header_adddress', 'Q'],
                    ['block_offset', `${e}B`]
                ]);
                this.indirect_block_header = new Map(e);
                this.indirect_block_header_size = l(e);
                2 == (b.get('flags') & 2) && e.set('checksum', 'I');
                this.direct_block_header = e;
                this.direct_block_header_size = l(e);
                e = b.get('maximum_direct_block_size');
                this._managed_object_offset_size = this._min_size_nbits(c);
                c = Math.min(e, b.get('max_managed_object_size'));
                this._managed_object_length_size = this._min_size_integer(c);
                c = b.get('starting_block_size');
                var f = b.get('table_width');
                if (!(0 < c)) throw 'Starting block size == 0 not implemented';
                var k = Number(Math.floor(Math.log2(e)));
                g(1n << BigInt(k) == e);
                e = Number(Math.floor(Math.log2(c)));
                g(1n << BigInt(e) == c);
                this._max_direct_nrows = k - e + 2;
                k = Math.floor(Math.log2(f));
                g(1 << k == f);
                this._indirect_nrows_sub = k + e - 1;
                this.header = b;
                this.nobjects = b.get('managed_object_count') + b.get('huge_object_count') + b.get('tiny_object_count');
                e = [];
                f = b.get('root_block_address');
                k = 0;
                null != f && (k = b.get('indirect_current_rows_count'));
                if (0 < k) for (let w of this._iter_indirect_block(a, f, k)) e.push(w);
                else (a = this._read_direct_block(a, f, c)), e.push(a);
                a = e.reduce((w, x) => w + x.byteLength, 0);
                let m = new Uint8Array(a),
                    v = 0;
                e.forEach((w) => {
                    m.set(new Uint8Array(w), v);
                    v += w.byteLength;
                });
                this.managed = m.buffer;
            }
            _read_direct_block(a, c, b) {
                a = a.slice(c, c + b);
                c = d(this.direct_block_header, a);
                g('FHDB' == c.get('signature'));
                return a;
            }
            get_data(a) {
                var c = F.unpack_from('<B', a, 0)[0],
                    b = (c >> 4) & 3;
                let e = 1;
                if (0 == b) return g(0 == c >> 6), (b = this._managed_object_offset_size), (c = p(b, a, e)), (e += b), (b = this._managed_object_length_size), (a = p(b, a, e)), this.managed.slice(c, c + a);
                if (1 == b) throw 'tiny objectID not supported in FractalHeap';
                if (2 == b) throw 'huge objectID not supported in FractalHeap';
                throw 'unknown objectID type in FractalHeap';
            }
            _min_size_integer(a) {
                return this._min_size_nbits(a.toString(2).length);
            }
            _min_size_nbits(a) {
                return Math.ceil(a / 8);
            }
            *_iter_indirect_block(a, c, b) {
                var e = d(this.indirect_block_header, a, c);
                c += this.indirect_block_header_size;
                g('FHIB' == e.get('signature'));
                var f = e.get('block_offset').reduce((x, G, C) => x + (G << (8 * C)), 0);
                e.set('block_offset', f);
                let [k, m] = this._indirect_info(b);
                b = [];
                for (e = 0; e < k; e++) {
                    f = F.unpack_from('<Q', a, c)[0];
                    c += 8;
                    if (f == Da) break;
                    var v = this._calc_block_size(e);
                    b.push([f, v]);
                }
                e = [];
                for (f = k; f < k + m; f++) {
                    v = F.unpack_from('<Q', a, c)[0];
                    c += 8;
                    if (v == Da) break;
                    var w = this._calc_block_size(f);
                    w = this._iblock_nrows_from_block_size(w);
                    e.push([v, w]);
                }
                for (let [x, G] of b) yield this._read_direct_block(a, x, G);
                for (let [x, G] of e) for (let C of this._iter_indirect_block(a, x, G)) yield C;
            }
            _calc_block_size(a) {
                a = Math.floor(a / this.header.get('table_width'));
                return 2 ** Math.max(a - 1, 0) * this.header.get('starting_block_size');
            }
            _iblock_nrows_from_block_size(a) {
                let c = Math.floor(Math.log2(a));
                g(2 ** c == a);
                return c - this._indirect_nrows_sub;
            }
            _indirect_info(a) {
                var c = this.header.get('table_width'),
                    b = a * c;
                c *= this._max_direct_nrows;
                a <= c ? ((a = b), (b = 0)) : ((a = c), (b -= c));
                return [a, b];
            }
            _int_format(a) {
                return ['B', 'H', 'I', 'Q'][a - 1];
            }
        },
        Vc = F.unpack_from('8s', new Uint8Array([137, 72, 68, 70, 13, 10, 26, 10]).buffer)[0],
        Da = F.unpack_from('<Q', new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]).buffer)[0],
        Hb = new Map([
            ['format_signature', '8s'],
            ['superblock_version', 'B'],
            ['free_storage_version', 'B'],
            ['root_group_version', 'B'],
            ['reserved_0', 'B'],
            ['shared_header_version', 'B'],
            ['offset_size', 'B'],
            ['length_size', 'B'],
            ['reserved_1', 'B'],
            ['group_leaf_node_k', 'H'],
            ['group_internal_node_k', 'H'],
            ['file_consistency_flags', 'L'],
            ['base_address_lower', 'Q'],
            ['free_space_address', 'Q'],
            ['end_of_file_address', 'Q'],
            ['driver_information_address', 'Q']
        ]),
        Tc = l(Hb),
        Ib = new Map([
            ['format_signature', '8s'],
            ['superblock_version', 'B'],
            ['offset_size', 'B'],
            ['length_size', 'B'],
            ['file_consistency_flags', 'B'],
            ['base_address', 'Q'],
            ['superblock_extension_address', 'Q'],
            ['end_of_file_address', 'Q'],
            ['root_group_address', 'Q'],
            ['superblock_checksum', 'I']
        ]),
        Uc = l(Ib),
        Lb = new Map([
            ['link_name_offset', 'Q'],
            ['object_header_address', 'Q'],
            ['cache_type', 'I'],
            ['reserved', 'I'],
            ['scratch', '16s']
        ]),
        $c = l(Lb),
        Kb = new Map([
            ['signature', '4s'],
            ['version', 'B'],
            ['reserved_0', 'B'],
            ['symbols', 'H']
        ]),
        Zc = l(Kb),
        Xc = new Map([
            ['signature', '4s'],
            ['version', 'B'],
            ['reserved', '3s'],
            ['data_segment_size', 'Q'],
            ['offset_to_free_list', 'Q'],
            ['address_of_data_segment', 'Q']
        ]),
        Mb = new Map([
            ['signature', '4s'],
            ['version', 'B'],
            ['reserved', '3s'],
            ['collection_size', 'Q']
        ]),
        Nb = l(Mb),
        Pb = new Map([
            ['object_index', 'H'],
            ['reference_count', 'H'],
            ['reserved', 'I'],
            ['object_size', 'Q']
        ]),
        Ob = l(Pb),
        Rb = new Map([
            ['signature', '4s'],
            ['version', 'B'],
            ['object_index_size', 'H'],
            ['filter_info_size', 'H'],
            ['flags', 'B'],
            ['max_managed_object_size', 'I'],
            ['next_huge_object_index', 'Q'],
            ['btree_address_huge_objects', 'Q'],
            ['managed_freespace_size', 'Q'],
            ['freespace_manager_address', 'Q'],
            ['managed_space_size', 'Q'],
            ['managed_alloc_size', 'Q'],
            ['next_directblock_iterator_address', 'Q'],
            ['managed_object_count', 'Q'],
            ['huge_objects_total_size', 'Q'],
            ['huge_object_count', 'Q'],
            ['tiny_objects_total_size', 'Q'],
            ['tiny_object_count', 'Q'],
            ['table_width', 'H'],
            ['starting_block_size', 'Q'],
            ['maximum_direct_block_size', 'Q'],
            ['log2_maximum_heap_size', 'H'],
            ['indirect_starting_rows_count', 'H'],
            ['root_block_address', 'Q'],
            ['indirect_current_rows_count', 'H']
        ]),
        fc = class {
            constructor(a, c) {
                let b = F.unpack_from('<B', a, c)[0];
                if (1 == b) var [e, f, k] = this._parse_v1_objects(a, c);
                else if (79 == b) var [e, f, k] = this._parse_v2_objects(a, c);
                else throw "InvalidHDF5File('unknown Data Object Header')";
                this.fh = a;
                this.msgs = e;
                this.msg_data = f;
                this.offset = c;
                this._global_heaps = {};
                this._header = k;
                this._filter_pipeline = null;
                this._chunk_params_set = !1;
                this._chunk_address = this._chunk_dims = this._chunks = null;
            }
            get dtype() {
                let a = this.find_msg_type(bd)[0].get('offset_to_message');
                return new cb(this.fh, a).dtype;
            }
            get chunks() {
                this._get_chunk_params();
                return this._chunks;
            }
            get shape() {
                let a = this.find_msg_type(Sb)[0].get('offset_to_message');
                return M(this.fh, a);
            }
            get filter_pipeline() {
                if (null != this._filter_pipeline) return this._filter_pipeline;
                var a = this.find_msg_type(cd);
                if (!a.length) return (this._filter_pipeline = null);
                a = a[0].get('offset_to_message');
                let [c, b] = F.unpack_from('<BB', this.fh, a);
                a += F.calcsize('<BB');
                var e = [];
                if (1 == c) {
                    F.unpack_from('<HI', this.fh, a);
                    a += F.calcsize('<HI');
                    for (var f = 0; f < b; f++) {
                        var k = d(Tb, this.fh, a);
                        a += dd;
                        var m = n(k.get('name_length'), 8),
                            v = '<' + m.toFixed() + 's';
                        v = F.unpack_from(v, this.fh, a)[0];
                        k.set('filter_name', v);
                        a += m;
                        v = '<' + k.get('client_data_values').toFixed() + 'I';
                        m = F.unpack_from(v, this.fh, a);
                        k.set('client_data', m);
                        a += 4 * k.get('client_data_values');
                        k.get('client_data_values') % 2 && (a += 4);
                        e.push(k);
                    }
                } else if (2 == c)
                    for (k = 0; k < b; k++) {
                        m = new Map();
                        v = this.fh;
                        var w = F.unpack_from('<H', v, a)[0];
                        a += 2;
                        m.set('filter_id', w);
                        let x = 0;
                        255 < w && ((x = F.unpack_from('<H', v, a)[0]), (a += 2));
                        w = F.unpack_from('<H', v, a)[0];
                        a += 2;
                        m.set('optional', 0 < (w & 1));
                        w = F.unpack_from('<H', v, a)[0];
                        a += 2;
                        0 < x && ((f = F.unpack_from(`${x}s`, v, a)[0]), (a += x));
                        m.set('name', f);
                        v = F.unpack_from(`<${w}i`, v, a);
                        a += 4 * w;
                        m.set('client_data_values', v);
                        e.push(m);
                    }
                else throw `version ${c} is not supported`;
                return (this._filter_pipeline = e);
            }
            find_msg_type(a) {
                return this.msgs.filter(function (c) {
                    return c.get('type') == a;
                });
            }
            get_attributes() {
                let a = {};
                var c = this.find_msg_type(ed);
                for (let b of c) {
                    c = b.get('offset_to_message');
                    let [e, f] = this.unpack_attribute(c);
                    a[e] = f;
                }
                return a;
            }
            get fillvalue() {
                var a = this.find_msg_type(fd)[0].get('offset_to_message');
                var c = F.unpack_from('<B', this.fh, a)[0];
                if (1 == c || 2 == c) (c = d(Ub, this.fh, a)), (a += gd), (c = c.get('fillvalue_defined'));
                else if (3 == c) (c = d(Vb, this.fh, a)), (a += hd), (c = c.get('flags') & 32);
                else throw 'InvalidHDF5File("Unknown fillvalue msg version: "' + String(c);
                c ? ((c = F.unpack_from('<I', this.fh, a)[0]), (a += 4)) : (c = 0);
                if (c) {
                    let [b, e, f] = h(this.dtype);
                    a = new aa(this.fh)[b](a, !e, f);
                } else a = 0;
                return a;
            }
            unpack_attribute(a) {
                var c = F.unpack_from('<B', this.fh, a)[0];
                if (1 == c) {
                    var b = d(Wb, this.fh, a);
                    g(1 == b.get('version'));
                    a += id;
                    var e = 8;
                } else if (3 == c) (b = d(Xb, this.fh, a)), g(3 == b.get('version')), (a += jd), (e = 1);
                else throw 'unsupported attribute message version: ' + c;
                var f = b.get('name_size');
                c = F.unpack_from('<' + f.toFixed() + 's', this.fh, a)[0];
                c = c.replace(/\x00$/, '');
                a += n(f, e);
                try {
                    var k = new cb(this.fh, a).dtype;
                } catch (v) {
                    return console.log('Attribute ' + c + ' type not implemented, set to null.'), [c, null];
                }
                a += n(b.get('datatype_size'), e);
                f = this.determine_data_shape(this.fh, a);
                let m = f.reduce(function (v, w) {
                    return v * w;
                }, 1);
                a += n(b.get('dataspace_size'), e);
                a = this._attr_value(k, this.fh, m, a);
                0 == f.length && (a = a[0]);
                return [c, a];
            }
            determine_data_shape(a, c) {
                var b = F.unpack_from('<B', a, c)[0];
                if (1 == b) (b = d(Ga, a, c)), g(1 == b.get('version')), (c += Za);
                else if (2 == b) (b = d(Ha, a, c)), g(2 == b.get('version')), (c += $a);
                else throw 'unknown dataspace message version';
                b = b.get('dimensionality');
                return F.unpack_from('<' + b.toFixed() + 'Q', a, c);
            }
            _attr_value(a, c, b, e) {
                var f = Array(b);
                if (a instanceof Array) {
                    let x = a[0];
                    for (var k = 0; k < b; k++)
                        if ('VLEN_STRING' == x) {
                            var m = a[2],
                                [v, w] = this._vlen_size_and_data(c, e);
                            m = new TextDecoder(0 == m ? 'ascii' : 'utf-8');
                            f[k] = m.decode(w);
                            e += 16;
                        } else if ('REFERENCE' == x) (m = F.unpack_from('<Q', c, e)), (f[k] = m), (e += 8);
                        else if ('VLEN_SEQUENCE' == x) {
                            m = a[1];
                            var [v, w] = this._vlen_size_and_data(c, e);
                            f[k] = this._attr_value(m, w, v, 0);
                            e += 16;
                        } else throw 'NotImplementedError';
                } else {
                    let [x, G, C] = h(a);
                    a = new aa(c, 0);
                    for (k = 0; k < b; k++) (f[k] = a[x](e, !G, C)), (e += C);
                }
                return f;
            }
            _vlen_size_and_data(a, c) {
                let b = F.unpack_from('<I', a, c)[0];
                a = d(Yb, a, c + 4);
                c = a.get('collection_address');
                g(a.get('collection_address') < Number.MAX_SAFE_INTEGER);
                if (!(c in this._global_heaps)) {
                    var e = new Qb(this.fh, c);
                    this._global_heaps[c] = e;
                }
                e = this._global_heaps[c];
                a = e.objects.get(a.get('object_index'));
                return [b, a];
            }
            _parse_v1_objects(a, c) {
                let b = d(Zb, a, c);
                g(1 == b.get('version'));
                let e = b.get('total_header_messages');
                var f = b.get('object_header_size');
                c += l(Zb);
                for (var k = a.slice(c, c + f), m = [[c, f]], v = 0, w = 0, x = Array(e), G = 0; G < e; G++) {
                    w >= f && (([c, f] = m[++v]), (w = 0));
                    let q = d($b, a, c + w),
                        u = c + w + ac;
                    q.set('offset_to_message', u);
                    if (q.get('type') == bc) {
                        var [C, A] = F.unpack_from('<QQ', a, u);
                        m.push([C, A]);
                    }
                    w += ac + q.get('size');
                    x[G] = q;
                }
                return [x, k, b];
            }
            _parse_v2_objects(a, c) {
                var [b, e, f] = this._parse_v2_header(a, c);
                c = f;
                var k = [],
                    m = b.get('size_of_chunk_0');
                c = a.slice(c, c + m);
                for (var v = [[f, m]], w = 0, x = 0; ; ) {
                    if (x >= m - Va) {
                        m = v[++w];
                        if (null == m) break;
                        [f, m] = m;
                        x = 0;
                    }
                    let A = d(cc, a, f + x),
                        q = f + x + Va + e;
                    A.set('offset_to_message', q);
                    if (A.get('type') == bc) {
                        var [G, C] = F.unpack_from('<QQ', a, q);
                        v.push([G + 4, C - 4]);
                    }
                    x += Va + A.get('size') + e;
                    k.push(A);
                }
                return [k, c, b];
            }
            _parse_v2_header(a, c) {
                let b = d(dc, a, c);
                c += l(dc);
                g(2 == b.get('version'));
                var e = b.get('flags') & 4 ? 2 : 0;
                g(0 == (b.get('flags') & 16));
                if (b.get('flags') & 32) {
                    var f = F.unpack_from('<4I', a, c);
                    c += 16;
                    b.set('access_time', f[0]);
                    b.set('modification_time', f[1]);
                    b.set('change_time', f[2]);
                    b.set('birth_time', f[3]);
                }
                f = ['<B', '<H', '<I', '<Q'][b.get('flags') & 3];
                b.set('size_of_chunk_0', F.unpack_from(f, a, c)[0]);
                c += F.calcsize(f);
                return [b, e, c];
            }
            get_links() {
                return Object.fromEntries(this.iter_links());
            }
            *iter_links() {
                for (let a of this.msgs) a.get('type') == kd ? yield* this._iter_links_from_symbol_tables(a) : a.get('type') == ld ? yield this._get_link_from_link_msg(a) : a.get('type') == md && (yield* this._iter_link_from_link_info_msg(a));
            }
            *_iter_links_from_symbol_tables(a) {
                g(16 == a.get('size'));
                a = d(nd, this.fh, a.get('offset_to_message'));
                yield* this._iter_links_btree_v1(a.get('btree_address'), a.get('heap_address'));
            }
            *_iter_links_btree_v1(a, c) {
                a = new Pc(this.fh, a);
                c = new Yc(this.fh, c);
                for (let b of a.symbol_table_addresses()) (a = new Jb(this.fh, b)), a.assign_name(c), yield* Object.entries(a.get_links(c));
            }
            _get_link_from_link_msg(a) {
                a = a.get('offset_to_message');
                return this._decode_link_msg(this.fh, a)[1];
            }
            _decode_link_msg(a, c) {
                let [b, e] = F.unpack_from('<BB', a, c);
                c += 2;
                g(1 == b);
                var f = 2 ** (e & 3),
                    k = 0 < (e & 16),
                    m = 0 < (e & 4);
                if (0 < (e & 8)) {
                    var v = F.unpack_from('<B', a, c)[0];
                    c += 1;
                } else v = 0;
                g([0, 1].includes(v));
                let w;
                m && ((w = F.unpack_from('<Q', a, c)[0]), (c += 8));
                m = 0;
                k && ((m = F.unpack_from('<B', a, c)[0]), (c += 1));
                k = 0 == m ? 'ascii' : 'utf-8';
                m = F.unpack_from(['<B', '<H', '<I', '<Q'][e & 3], a, c)[0];
                c += f;
                f = new TextDecoder(k).decode(a.slice(c, c + m));
                c += m;
                let x;
                0 == v ? (x = F.unpack_from('<Q', a, c)[0]) : 1 == v && ((v = F.unpack_from('<H', a, c)[0]), (c += 2), (x = new TextDecoder(k).decode(a.slice(c, c + v))));
                return [w, [f, x]];
            }
            *_iter_link_from_link_info_msg(a) {
                a = a.get('offset_to_message');
                var c = this._decode_link_info_msg(this.fh, a);
                a = c.get('heap_address');
                let b = c.get('name_btree_address');
                c = c.get('order_btree_address');
                null != b && (yield* this._iter_links_btree_v2(b, c, a));
            }
            *_iter_links_btree_v2(a, c, b) {
                b = new ad(this.fh, b);
                c = c != Wa ? new Sc(this.fh, c) : new Rc(this.fh, a);
                a = new Map();
                for (var e of c.iter_records()) {
                    c = b.get_data(e.get('heapid'));
                    let [f, k] = this._decode_link_msg(c, 0);
                    a.set(f, k);
                }
                e = Array.from(a.keys()).sort();
                for (let f of e) yield a.get(f);
            }
            _decode_link_info_msg(a, c) {
                let [b, e] = F.unpack_from('<BB', a, c);
                g(0 == b);
                c += 2;
                0 < (e & 1) && (c += 8);
                a = d(0 < (e & 2) ? od : pd, a, c);
                c = new Map();
                for (let [f, k] of a.entries()) c.set(f, k == Wa ? null : k);
                return c;
            }
            get is_dataset() {
                return 0 < this.find_msg_type(Sb).length;
            }
            get_data() {
                let a = this.find_msg_type(ec)[0].get('offset_to_message');
                var [, , c, b] = this._get_data_message_properties(a);
                if (0 == c) throw 'Compact storage of DataObject not implemented';
                if (1 == c) return this._get_contiguous_data(b);
                if (2 == c) return this._get_chunked_data(a);
            }
            _get_data_message_properties(a) {
                let c,
                    b,
                    e,
                    [f, k, m] = F.unpack_from('<BBB', this.fh, a);
                if (1 == f || 2 == f) (c = k), (b = m), (e = a + F.calcsize('<BBB')), (e += F.calcsize('<BI')), g(1 == b || 2 == b);
                else if (3 == f || 4 == f) (b = k), (e = a + F.calcsize('<BB'));
                g(1 <= f && 4 >= f);
                return [f, c, b, e];
            }
            _get_contiguous_data(a) {
                [a] = F.unpack_from('<Q', this.fh, a);
                if (a == Wa)
                    return (
                        (a = this.shape.reduce(function (k, m) {
                            return k * m;
                        }, 1)),
                        Array(a)
                    );
                var c = this.shape.reduce(function (k, m) {
                    return k * m;
                }, 1);
                if (this.dtype instanceof Array) {
                    var b = this.dtype[0];
                    if ('REFERENCE' == b) {
                        if (8 != this.dtype[1]) throw "NotImplementedError('Unsupported Reference type')";
                        return this.fh.slice(a, a + c);
                    }
                    if ('VLEN_STRING' == b) {
                        var e = new TextDecoder(0 == this.dtype[2] ? 'ascii' : 'utf-8'),
                            f = [];
                        for (b = 0; b < c; b++) {
                            const [, k] = this._vlen_size_and_data(this.fh, a);
                            f[b] = e.decode(k);
                            a += 16;
                        }
                        return f;
                    }
                    throw "NotImplementedError('datatype not implemented')";
                }
                b = this.dtype;
                if (/[<>=!@\|]?(i|u|f|S)(\d*)/.test(b)) {
                    let [k, m, v] = h(b);
                    f = Array(c);
                    e = new aa(this.fh);
                    for (b = 0; b < c; b++) f[b] = e[k](a + b * v, !m, v);
                    return f;
                }
                throw 'not Implemented - no proper dtype defined';
            }
            _get_chunked_data(a) {
                this._get_chunk_params();
                a = new Qc(this.fh, this._chunk_address, this._chunk_dims).construct_data_from_chunks(this.chunks, this.shape, this.dtype, this.filter_pipeline);
                if (this.dtype instanceof Array && /^VLEN/.test(this.dtype[0])) {
                    let e = this.dtype[0];
                    for (var c = 0; c < a.length; c++) {
                        let [, f, k] = a[c];
                        if (f in this._global_heaps) var b = this._global_heaps[f];
                        else (b = new Qb(this.fh, f)), (this._global_heaps[f] = b);
                        b = b.objects.get(k);
                        if ('VLEN_STRING' == e) {
                            const m = new TextDecoder(0 == this.dtype[2] ? 'ascii' : 'utf-8');
                            a[c] = m.decode(b);
                        }
                    }
                }
                return a;
            }
            _get_chunk_params() {
                if (!this._chunk_params_set) {
                    this._chunk_params_set = !0;
                    var a = this.find_msg_type(ec)[0].get('offset_to_message'),
                        [c, b, e, f] = this._get_data_message_properties(a);
                    if (2 == e) {
                        if (1 == c || 2 == c) {
                            var k = F.unpack_from('<Q', this.fh, f)[0];
                            var m = f + F.calcsize('<Q');
                        } else if (3 == c) {
                            var [b, k] = F.unpack_from('<BQ', this.fh, f);
                            m = f + F.calcsize('<BQ');
                        }
                        g(1 <= c && 3 >= c);
                        a = '<' + (b - 1).toFixed() + 'I';
                        this._chunks = F.unpack_from(a, this.fh, m);
                        this._chunk_dims = b;
                        this._chunk_address = k;
                    }
                }
            }
        },
        Wa = F.unpack_from('<Q', new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]).buffer),
        Yb = new Map([
            ['collection_address', 'Q'],
            ['object_index', 'I']
        ]);
    l(Yb);
    var Wb = new Map([
            ['version', 'B'],
            ['reserved', 'B'],
            ['name_size', 'H'],
            ['datatype_size', 'H'],
            ['dataspace_size', 'H']
        ]),
        id = l(Wb),
        Xb = new Map([
            ['version', 'B'],
            ['flags', 'B'],
            ['name_size', 'H'],
            ['datatype_size', 'H'],
            ['dataspace_size', 'H'],
            ['character_set_encoding', 'B']
        ]),
        jd = l(Xb),
        Zb = new Map([
            ['version', 'B'],
            ['reserved', 'B'],
            ['total_header_messages', 'H'],
            ['object_reference_count', 'I'],
            ['object_header_size', 'I'],
            ['padding', 'I']
        ]),
        dc = new Map([
            ['signature', '4s'],
            ['version', 'B'],
            ['flags', 'B']
        ]),
        Ga = new Map([
            ['version', 'B'],
            ['dimensionality', 'B'],
            ['flags', 'B'],
            ['reserved_0', 'B'],
            ['reserved_1', 'I']
        ]),
        Za = l(Ga),
        Ha = new Map([
            ['version', 'B'],
            ['dimensionality', 'B'],
            ['flags', 'B'],
            ['type', 'B']
        ]),
        $a = l(Ha),
        $b = new Map([
            ['type', 'H'],
            ['size', 'H'],
            ['flags', 'B'],
            ['reserved', '3s']
        ]),
        ac = l($b),
        cc = new Map([
            ['type', 'B'],
            ['size', 'H'],
            ['flags', 'B']
        ]),
        Va = l(cc),
        nd = new Map([
            ['btree_address', 'Q'],
            ['heap_address', 'Q']
        ]),
        pd = new Map([
            ['heap_address', 'Q'],
            ['name_btree_address', 'Q']
        ]),
        od = new Map([
            ['heap_address', 'Q'],
            ['name_btree_address', 'Q'],
            ['order_btree_address', 'Q']
        ]),
        Ub = new Map([
            ['version', 'B'],
            ['space_allocation_time', 'B'],
            ['fillvalue_write_time', 'B'],
            ['fillvalue_defined', 'B']
        ]),
        gd = l(Ub),
        Vb = new Map([
            ['version', 'B'],
            ['flags', 'B']
        ]),
        hd = l(Vb),
        Tb = new Map([
            ['filter_id', 'H'],
            ['name_length', 'H'],
            ['flags', 'H'],
            ['client_data_values', 'H']
        ]),
        dd = l(Tb),
        Sb = 1,
        md = 2,
        bd = 3,
        fd = 5,
        ld = 6,
        ec = 8,
        cd = 11,
        ed = 12,
        bc = 16,
        kd = 17,
        xa = class {
            constructor(a, c, b, e = !1) {
                null == b ? ((this.parent = this), (this.file = this)) : ((this.parent = b), (this.file = b.file));
                this.name = a;
                this._links = c.get_links();
                this._dataobjects = c;
                this._keys = this._attrs = null;
                if (e) return new Proxy(this, qd);
            }
            get keys() {
                null == this._keys && (this._keys = Object.keys(this._links));
                return this._keys.slice();
            }
            get values() {
                return this.keys.map((a) => this.get(a));
            }
            length() {
                return this.keys.length;
            }
            _dereference(a) {
                if (!a) throw 'cannot deference null reference';
                a = this.file._get_object_by_address(a);
                if (null == a) throw 'reference not found in file';
                return a;
            }
            get(a) {
                if ('number' == typeof a) return this._dereference(a);
                a = a.replace(/\/(\/)+/g, '/');
                if ('/' == a) return this.file;
                if ('.' == a) return this;
                if (/^\//.test(a)) return this.file.get(a.slice(1));
                var c = a.lastIndexOf('/') + 1;
                c = a.slice(0, c);
                let b = RegExp('^/+$'),
                    e = RegExp('/$');
                c && !b.test(c) && (c = c.replace(e, ''));
                if ('' != c) var [f, k] = a.split(/\/(.*)/);
                else (f = a), (k = '.');
                if (!(f in this._links)) throw f + ' not found in group';
                a = (this.name + '/' + f).replace(/\/(\/)+/g, '/');
                c = this._links[f];
                if ('string' == typeof c)
                    try {
                        return this.get(c);
                    } catch (m) {
                        return null;
                    }
                c = new fc(this.file._fh, c);
                if (c.is_dataset) {
                    if ('.' != k) throw a + ' is a dataset, not a group';
                    return new ab(a, c, this);
                }
                return new xa(a, c, this).get(k);
            }
            visit(a) {
                return this.visititems((c, b) => a(c));
            }
            visititems(a) {
                var c = this.name.length;
                /\/$/.test(this.name) || (c += 1);
                for (var b = this.values.slice(); b; ) {
                    let f = b.shift();
                    1 == b.length && console.log(f);
                    var e = f.name.slice(c);
                    e = a(e, f);
                    if (null != e) return e;
                    f instanceof xa && (b = b.concat(f.values));
                }
                return null;
            }
            get attrs() {
                null == this._attrs && (this._attrs = this._dataobjects.get_attributes());
                return this._attrs;
            }
        },
        qd = {
            get: function (a, c, b) {
                return c in a ? a[c] : a.get(c);
            }
        },
        ic = class extends xa {
            constructor(a, c) {
                var b = new Wc(a, 0).offset_to_dataobjects;
                super('/', new fc(a, b), null);
                this.parent = this;
                this._fh = a;
                this.filename = c || '';
                this.file = this;
                this.mode = 'r';
                this.userblock_size = 0;
            }
            _get_object_by_address(a) {
                return this._dataobjects.offset == a
                    ? this
                    : this.visititems((c) => {
                          c._dataobjects.offset == a ? c : null;
                      });
            }
        },
        ab = class extends Array {
            constructor(a, c, b) {
                super();
                this.parent = b;
                this.file = b.file;
                this.name = a;
                this._dataobjects = c;
                this._astype = this._attrs = null;
            }
            get value() {
                var a = this._dataobjects.get_data();
                return null == this._astype ? a : a.astype(this._astype);
            }
            get shape() {
                return this._dataobjects.shape;
            }
            get attrs() {
                return this._dataobjects.get_attributes();
            }
            get dtype() {
                return this._dataobjects.dtype;
            }
            get fillvalue() {
                return this._dataobjects.fillvalue;
            }
        };
    return ha;
})();
export function round(d, g) {
    g = Math.pow(10, g);
    return Math.round(d * g) / g;
}
export function roundSF(d, g) {
    return parseFloat(d.toPrecision(g));
}
export function timeOffsetToDate(d, g) {
    d *= 36e5;
    g = Date.parse(g);
    return new Date(g + d);
}
export function DatePlusSeconds(d, g) {
    d = d.getTime();
    return new Date(d + 1e3 * g);
}
export function makeInitialisationTimeStr(d) {
    return 'Initialised ' + getDateString(d) + ' UTC';
}
export function makeValidTimeStr(d, g) {
    let l = getDateString(d);
    d = DatePlusSeconds(d, 3600 * g);
    d = getDateString(d);
    return 'Valid ' + l + ' to ' + d + ' UTC';
}
export function getDateString(d) {
    return d.getUTCFullYear() + '-' + ('0' + (d.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + d.getUTCDate()).slice(-2) + ' ' + ('0' + d.getUTCHours()).slice(-2) + ':' + ('0' + d.getUTCMinutes()).slice(-2);
}
export async function drawImageData(d, g, l, n, h, p) {
    g = await createImageBitmap(g);
    d.drawImage(g, l, n, h, p);
}
export async function drawImageWithColourMap(d, g, l, n, h, p, r, y) {
    const E = new Uint8ClampedArray(4 * g.values.length);
    for (let D = 0; D < g.values.length; D++) {
        let H = g.values[D] / y,
            J;
        for (J = 0; J < r.values.length && !(H < r.values[J]); J++);
        --J;
        J = Math.max(J, 0);
        J = Math.min(J, r.r.length - 1);
        E[4 * D] = r.r[J];
        E[4 * D + 1] = r.g[J];
        E[4 * D + 2] = r.b[J];
        E[4 * D + 3] = 255;
    }
    g = new ImageData(E, g.shape[1], g.shape[0]);
    await drawImageData(d, g, l, n, h, p);
}
export class colourBarSpecification {
    constructor() {
        this.showColourBar = !1;
        this.normalisation = 1;
        this.barThickness = 15;
        this.sizeFraction = 0.8;
        this.boundingBoxColour = '#b3b3b3';
        this.boundingBoxLineWidth = 1;
        this.plotGap = 10;
        this.labelGap = 4;
        this.label = '';
        this.labelFontSize = 10;
        this.labelFont = 'Arial';
        this.labelColour = 'black';
        this.tickLength = 8;
        this.tickLineWidth = 1;
        this.maxTicks = 15;
        this.tickColour = '#b3b3b3';
        this.tickTextFontSize = 10;
        this.tickTextFont = 'Arial';
        this.tickTextColour = 'black';
        this.tickRoundingDP = 2;
        this.tickLabels = [];
    }
}
export class plotSpecification {
    constructor() {
        this.colourMap = defaultColourMap;
        this.titleSpec = {
            titleArray: [],
            font: 'Arial',
            fontSize: 12,
            verticalSpacing: 8,
            colour: 'black'
        };
        this.colourBarSpec = new colourBarSpecification();
        this.boundingBoxColour = '#b3b3b3';
        this.boundingBoxLineWidth = 1;
        this.eraseBackground = !1;
        this.regionSpec = null;
        this.drawRegions = !1;
        this.regionName = '';
        this.regionColour = '#262626';
        this.regionLineWidth = 1.25;
        this.drawLakes = !1;
        this.lakeColour = '#999999';
        this.lakeLineWidth = 1;
    }
}
export class barChartSpecification {
    constructor() {
        this.boxFillColour = '#006699';
        this.boxOutlineColour = 'black';
        this.boxOutlineWidth = 1;
        this.drawAxisBox = !0;
        this.axesColour = 'black';
        this.axesLineWidth = 1;
        this.tickLabelFontSize = 10;
        this.tickLabelFont = 'Arial';
        this.xTickSignificantFigures = 3;
        this.xTickColour = 'black';
        this.xTickLength = 8;
        this.xTickLineWidth = 1;
        this.drawXTickLabels = !0;
        this.xTickLabelColour = 'black';
        this.xTickLabelRotated = !1;
        this.targetYTicks = 8;
        this.yTickSignificantFigures = 2;
        this.yTickColour = 'black';
        this.yTickLength = 8;
        this.yTickLineWidth = 1;
        this.drawYTickLabels = !0;
        this.yTickLabelColour = 'black';
        this.titleFontSize = 12;
        this.titleFont = 'Arial';
        this.titleTextAlign = 'center';
        this.titleArray = [];
        this.titleVerticalSpacing = 8;
        this.titleColour = 'black';
        this.drawThresholdProbability = !1;
        this.thresholdProbability = 0.95;
        this.thresholdProbabilityLineColour = 'red';
        this.thresholdProbabilityLineWidth = 2;
        this.thresholdProbabilityLineDash = [];
        this.exceedanceValue = 0;
        this.drawThresholdValue = !1;
        this.thresholdValue = 0;
        this.thresholdValueLineColour = 'blue';
        this.thresholdValueLineWidth = 2;
        this.thresholdValueLineDash = [];
        this.exceedanceProbability = 0;
        this.dataUnits = '';
        this.legendFont = 'Arial';
        this.legendFontSize = 10;
        this.legendVerticalSpacing = 8;
        this.legendTextColour = 'black';
        this.legendAlign = 'right';
        this.legendLineLength = 40;
        this.xLabel = '';
        this.xLabelFontSize = 12;
        this.xLabelFont = 'Arial';
        this.xAxisLabelColour = 'black';
        this.yLabel = 'Count';
        this.yLabelFontSize = 12;
        this.yLabelFont = 'Arial';
        this.yAxisLabelColour = 'black';
        this.drawHorizontalGridLines = !0;
        this.horizontalGridLineColour = '#b6b6b6';
        this.horizontalGridLineWidth = 1;
        this.drawVerticalGridLines = !1;
        this.verticalGridLineColour = '#b6b6b6';
        this.verticalGridLineWidth = 1;
        this.labelGap = 6;
        this.offsetFromRightBoundary = 10;
        this.eraseBackground = !1;
    }
}
export function fillOutColourBarSpecification(d) {
    let g = new colourBarSpecification(),
        l = Object.keys(d);
    for (let n = 0; n < l.length; n++) g[l[n]] = d[l[n]];
    return g;
}
export function fillOutPlotSpecification(d) {
    let g = new plotSpecification(),
        l = Object.keys(d);
    for (let n = 0; n < l.length; n++)
        if ('titleSpec' != l[n] && 'colourBarSpec' != l[n]) g[l[n]] = d[l[n]];
        else if ('titleSpec' == l[n]) {
            let h = Object.keys(d.titleSpec);
            for (let p = 0; p < h.length; p++) g.titleSpec[h[p]] = d.titleSpec[h[p]];
        } else 'colourBarSpec' == l[n] && (g.colourBarSpec = fillOutColourBarSpecification(d.colourBarSpec));
    return g;
}
export function fillOutBarChartSpecification(d) {
    let g = new barChartSpecification(),
        l = Object.keys(d);
    for (let n = 0; n < l.length; n++) g[l[n]] = d[l[n]];
    return g;
}
export function drawColourBar(d, g, l, n, h, p) {
    p = fillOutColourBarSpecification(p);
    var r = p.normalisation;
    const y = p.labelFontSize;
    d.font = y + 'pt ' + p.labelFont;
    d.textBaseline = 'middle';
    const E = p.tickLength;
    let D = p.labelGap,
        H = p.barThickness,
        J = n * p.sizeFraction,
        O = J / h.r.length,
        M,
        I = 0,
        N = [],
        ha = Math.ceil(h.values.length / p.maxTicks);
    for (let Y = 0; Y < h.values.length; Y += ha) (N[Y] = p.tickLabels.length > Y ? p.tickLabels[Y] : round(h.values[Y] * r, p.tickRoundingDP).toString()), (M = d.measureText(N[Y]).width), M > I && (I = M);
    r = '' == p.label ? H + E + D + I : H + E + 2 * D + I + 2 * y;
    g -= r;
    l += (n * (1 - p.sizeFraction)) / 2;
    for (n = 0; n < h.r.length; n++) (d.fillStyle = 'rgb(' + h.r[n] + ',' + h.g[n] + ',' + h.b[n] + ')'), d.fillRect(g, J + l - O * (n + 1), H, O);
    d.strokeStyle = p.tickColour;
    d.lineWidth = p.tickLineWidth;
    d.font = p.tickTextFontSize + 'pt ' + p.tickTextFont;
    d.fillStyle = p.tickTextColour;
    for (n = 0; n < h.values.length; n += ha) d.beginPath(), d.moveTo(g + H, J + l - O * n), d.lineTo(g + H + E, J + l - O * n), d.stroke(), d.fillText(N[n], g + H + E + D, J + l - O * n);
    d.strokeStyle = p.boundingBoxColour;
    d.lineWidth = p.boundingBoxLineWidth;
    d.beginPath();
    d.rect(g, l, H + 1, J + 1);
    d.stroke();
    '' != p.label && ((d.font = y + 'pt ' + p.labelFont), (d.fillStyle = p.labelColour), (d.textAlign = 'center'), d.translate(g + H + E + 2 * D + I + y, l + J / 2), d.rotate(-Math.PI / 2), d.fillText(p.label, 0, 0), d.resetTransform());
    return r;
}
export function setAspectRatio(d, g, l, n) {
    let h = d[0],
        p = d[1],
        r = d[2] - d[0];
    d = d[3] - d[1];
    if ('equal' == n || 'number' == typeof n) {
        n = 'equal' == n ? 1 : n;
        let y = (n * l * r) / g;
        y < d ? ((p += (d - y) / 2), (d = y)) : ((g = (g / n) * (d / l)), (h += (r - g) / 2), (r = g));
    } else 'square' == n && (r < d ? ((p += (d - r) / 2), (d = r)) : ((h += (r - d) / 2), (r = d)));
    return [h, p, h + r, p + d];
}
export async function pcolormesh(d, g, l, n, h, p) {
    p = fillOutPlotSpecification(p);
    p.eraseBackground && d.clearRect(g[0], g[1], g[2] - g[0], g[3] - g[1]);
    var r = g[0];
    let y = g[1],
        E = g[2] - g[0];
    g = g[3] - g[1];
    var D = p.titleSpec.fontSize,
        H = D + p.titleSpec.verticalSpacing;
    let J = H * p.titleSpec.titleArray.length;
    d.textAlign = 'left';
    d.textBaseline = 'alphabetic';
    d.fillStyle = p.titleSpec.colour;
    d.font = D + 'pt ' + p.titleSpec.font;
    for (var O = 0; O < p.titleSpec.titleArray.length; O++) d.fillText(p.titleSpec.titleArray[O], r, y + D + H * O);
    p.colourBarSpec.showColourBar ? ((H = drawColourBar(d, r + E, y + J, g - J, p.colourMap, p.colourBarSpec)), (O = p.colourBarSpec.plotGap)) : (O = H = 0);
    D = min(l);
    l = max(l);
    let M = [D, l],
        I = min(n);
    n = max(n);
    let N = [I, n];
    r = [r, y + J, r + E - H - O, y + g];
    'auto' != p.aspectRatio && (r = setAspectRatio(r, l - D, n - I, p.aspectRatio));
    await drawImageWithColourMap(d, h.flip(0), r[0], r[1], r[2] - r[0], r[3] - r[1], p.colourMap, p.colourBarSpec.normalisation);
    p.drawRegions && (null == p.regionSpec ? console.log('WARNING: drawRegions == true but regionSpec == null in pcolormesh') : await p.regionSpec.drawRegionList(d, r, N, M, p.regionColour, p.regionLineWidth, p.regionName));
    p.drawLakes && (null == p.regionSpec ? console.log('WARNING: drawLakes == true but regionSpec == null in pcolormesh') : await p.regionSpec.drawLakes(d, r, N, M, p.lakeColour, p.lakeLineWidth));
    d.strokeStyle = p.boundingBoxColour;
    d.lineWidth = p.boundingBoxLineWidth;
    d.beginPath();
    d.rect(r[0], r[1], r[2] - r[0], r[3] - r[1]);
    d.stroke();
    return r;
}
export function barChart(d, g, l, n, h) {
    h = fillOutBarChartSpecification(h);
    h.eraseBackground && d.clearRect(g[0], g[1], g[2] - g[0], g[3] - g[1]);
    d.textAlign = h.titleTextAlign;
    d.textBaseline = 'alphabetic';
    d.fillStyle = h.titleColour;
    d.font = h.titleFontSize + 'pt ' + h.titleFont;
    var p = h.titleFontSize + h.titleVerticalSpacing,
        r;
    'left' == h.titleTextAlign ? (r = g[0]) : 'center' == h.titleTextAlign ? (r = (g[0] + g[2]) / 2) : 'right' == h.titleTextAlign && (r = g[2]);
    for (var y = 0; y < h.titleArray.length; y++) d.fillText(h.titleArray[y], r, g[1] + h.titleFontSize + p * y);
    var E = p * h.titleArray.length;
    if (h.drawThresholdProbability) {
        d.textAlign = h.legendAlign;
        d.fillStyle = h.legendTextColour;
        d.font = h.legendFontSize + 'pt ' + h.legendFont;
        r = round(100 * h.thresholdProbability, 0) + '% chance of rainfall below ' + roundSF(h.exceedanceValue, 3) + ' ' + h.dataUnits;
        'left' == h.legendAlign
            ? ((p = g[0] + h.labelGap), (y = g[0] + h.legendLineLength + 3 * h.labelGap))
            : 'center' == h.legendAlign
              ? ((p = (g[0] + g[2]) / 2 - h.legendLineLength / 2 - h.labelGap / 2 - d.measureText(r).width / 2), (y = (g[0] + g[2]) / 2 + h.legendLineLength / 2 + 1.5 * h.labelGap))
              : ((h.legendAlign = 'right'), (p = g[2] - d.measureText(r).width - h.legendLineLength - 2 * h.labelGap), (y = g[2]));
        var D = g[1] + h.legendFontSize / 2 + E;
        d.strokeStyle = h.thresholdProbabilityLineColour;
        d.lineWidth = h.thresholdProbabilityLineWidth;
        d.setLineDash(h.thresholdProbabilityLineDash);
        d.beginPath();
        d.moveTo(p, D);
        d.lineTo(p + h.legendLineLength, D);
        d.stroke();
        d.setLineDash([]);
        d.fillText(r, y, g[1] + h.legendFontSize + E);
        E += h.legendFontSize + h.legendVerticalSpacing;
    }
    h.drawThresholdValue &&
        ((d.textAlign = h.legendAlign),
        (d.fillStyle = h.legendTextColour),
        (d.font = h.legendFontSize + 'pt ' + h.legendFont),
        (r = roundSF(h.thresholdValue, 3) + ' ' + h.dataUnits + ' exceeded with ' + round(100 * h.exceedanceProbability, 1) + '% probability'),
        'left' == h.legendAlign
            ? ((p = g[0] + h.labelGap), (y = g[0] + h.legendLineLength + 3 * h.labelGap))
            : 'center' == h.legendAlign
              ? ((p = (g[0] + g[2]) / 2 - h.legendLineLength / 2 - h.labelGap / 2 - d.measureText(r).width / 2), (y = (g[0] + g[2]) / 2 + h.legendLineLength / 2 + 1.5 * h.labelGap))
              : ((h.legendAlign = 'right'), (p = g[2] - d.measureText(r).width - h.legendLineLength - 2 * h.labelGap), (y = g[2])),
        (D = g[1] + h.legendFontSize / 2 + E),
        (d.strokeStyle = h.thresholdValueLineColour),
        (d.lineWidth = h.thresholdValueLineWidth),
        d.setLineDash(h.thresholdValueLineDash),
        d.beginPath(),
        d.moveTo(p, D),
        d.lineTo(p + h.legendLineLength, D),
        d.stroke(),
        d.setLineDash([]),
        d.fillText(r, y, g[1] + h.legendFontSize + E),
        (E += h.legendFontSize + h.legendVerticalSpacing));
    r = Array(n.length);
    for (p = 0; p < n.length; p++) r[p] = 'number' == typeof n[p] ? roundSF(n[p], h.xTickSignificantFigures).toString() : n[p];
    p = 0;
    if (h.xTickLabelRotated) for (d.font = h.tickLabelFontSize + 'pt ' + h.tickLabelFont, y = 0; y < r.length; y++) (D = d.measureText(r[y]).width), D > p && (p = D);
    else p = h.tickLabelFontSize;
    y = g[3] - (h.drawXTickLabels ? ('' == h.xLabel ? h.xTickLength + 2 * h.labelGap + p : h.xTickLength + 4 * h.labelGap + p + h.xLabelFontSize) : '' == h.xLabel ? h.xTickLength + h.labelGap : h.xTickLength + 2 * h.labelGap + h.xLabelFontSize);
    E = g[1] + E;
    var H = max(l);
    D = (y - E) / H;
    H = round(H / h.targetYTicks, 0);
    let J = 0,
        O = [];
    if (h.drawYTickLabels) {
        d.font = h.tickLabelFontSize + 'pt ' + h.tickLabelFont;
        var M = y,
            I = 0;
        for (O[I] = 0; M > E; ) {
            M -= H * D;
            I += 1;
            O[I] = roundSF(O[I - 1] + H, h.yTickSignificantFigures + 1);
            var N = d.measureText(O[I]).width;
            N > J && (J = N);
        }
    }
    N = g[0] + ('' == h.yLabel ? h.yTickLength + 1 * h.labelGap + J : h.yTickLength + 3 * h.labelGap + J + h.yLabelFontSize);
    g = g[2] - h.offsetFromRightBoundary;
    M = (g - N) / (r.length - 1);
    d.fillStyle = h.boxFillColour;
    d.strokeStyle = h.boxOutlineColour;
    d.lineWidth = h.boxOutlineWidth;
    let ha, Y;
    for (let aa = 0; aa < l.length; aa++) {
        I = N + aa * M;
        var F = y - l[aa] * D;
        ha = M;
        Y = l[aa] * D;
        d.fillRect(I, F, ha, Y);
        d.strokeRect(I, F, ha, Y);
    }
    if (h.drawThresholdProbability) {
        l = 0;
        if (h.exceedanceValue > n[n.length - 2]) l = M * (n.length - 1.5);
        else {
            for (I = 0; h.exceedanceValue > n[I]; ) (l += M), (I += 1);
            l -= M * (0 == I ? 0 : (n[I] - h.exceedanceValue) / (n[I] - n[I - 1]));
        }
        d.strokeStyle = h.thresholdProbabilityLineColour;
        d.lineWidth = h.thresholdProbabilityLineWidth;
        d.setLineDash(h.thresholdProbabilityLineDash);
        d.beginPath();
        d.moveTo(N + l, E);
        d.lineTo(N + l, y);
        d.stroke();
        d.setLineDash([]);
    }
    if (h.drawThresholdValue) {
        l = 0;
        if (h.thresholdValue > n[n.length - 2]) l = M * (n.length - 1.5);
        else {
            for (I = 0; h.thresholdValue > n[I]; ) (l += M), (I += 1);
            l -= M * (0 == I ? 0 : (n[I] - h.thresholdValue) / (n[I] - n[I - 1]));
        }
        d.strokeStyle = h.thresholdValueLineColour;
        d.lineWidth = h.thresholdValueLineWidth;
        d.setLineDash(h.thresholdValueLineDash);
        d.beginPath();
        d.moveTo(N + l, E);
        d.lineTo(N + l, y);
        d.stroke();
        d.setLineDash([]);
    }
    d.strokeStyle = h.axesColour;
    d.lineWidth = h.axesLineWidth;
    d.beginPath();
    d.moveTo(g, y);
    h.axesLineWidth == h.yTickLineWidth && h.axesColour == h.yTickColour ? d.lineTo(N - h.yTickLength, y) : d.lineTo(N, y);
    d.moveTo(N, E);
    h.axesLineWidth == h.xTickLineWidth && h.axesColour == h.xTickColour ? d.lineTo(N, y + h.xTickLength) : d.lineTo(N, y);
    h.drawAxisBox && (h.axesLineWidth == h.xTickLineWidth && h.axesColour == h.xTickColour ? d.moveTo(g, y + h.xTickLength) : d.moveTo(g, y), d.lineTo(g, E), d.lineTo(N, E));
    d.stroke();
    l = N;
    I = 0;
    h.axesLineWidth == h.xTickLineWidth && h.axesColour == h.xTickColour && ((l += M), (I = 1));
    d.strokeStyle = h.xTickColour;
    d.lineWidth = h.xTickLineWidth;
    for (F = I; F < r.length - I; F++) d.beginPath(), d.moveTo(l, y), d.lineTo(l, y + h.xTickLength), d.stroke(), (l += M);
    if (h.drawXTickLabels)
        for (d.textAlign = 'end', d.textBaseline = 'middle', d.fillStyle = h.xTickLabelColour, d.font = h.tickLabelFontSize + 'pt ' + h.tickLabelFont, l = N, I = 0; I < n.length; I++)
            d.translate(l, y + h.yTickLength + h.labelGap), d.rotate(-Math.PI / 2), d.fillText(r[I], 0, 0), d.resetTransform(), (l += M);
    if (h.drawVerticalGridLines) for (d.strokeStyle = h.verticalGridLineColour, d.lineWidth = h.verticalGridLineWidth, l = N + M, n = 1; n < r.length - 1; n++) d.beginPath(), d.moveTo(l, E), d.lineTo(l, y), d.stroke(), (l += M);
    d.textAlign = 'center';
    d.textBaseline = 'top';
    d.fillStyle = h.xAxisLabelColour;
    d.font = h.xLabelFontSize + 'pt ' + h.xLabelFont;
    d.fillText(h.xLabel, (N + g) / 2, h.drawXTickLabels ? y + h.xTickLength + 3 * h.labelGap + p : y + h.xTickLength + h.labelGap);
    d.strokeStyle = h.yTickColour;
    d.lineWidth = h.yTickLineWidth;
    n = y;
    for (h.axesLineWidth == h.yTickLineWidth && (n -= H * D); n > E; ) d.beginPath(), d.moveTo(N - h.yTickLength, n), d.lineTo(N, n), d.stroke(), (n -= H * D);
    if (h.drawYTickLabels)
        for (d.textAlign = 'right', d.textBaseline = 'middle', d.fillStyle = h.yTickLabelColour, d.font = h.tickLabelFontSize + 'pt ' + h.tickLabelFont, n = y, l = 0; n > E; )
            d.fillText(O[l], N - h.yTickLength - h.labelGap, n), (n -= H * D), (l += 1);
    if (h.drawHorizontalGridLines) for (d.strokeStyle = h.horizontalGridLineColour, d.lineWidth = h.horizontalGridLineWidth, n = y - H * D; n > E; ) d.beginPath(), d.moveTo(N, n), d.lineTo(g, n), d.stroke(), (n -= H * D);
    d.textAlign = 'center';
    d.textBaseline = 'bottom';
    d.fillStyle = h.yAxisLabelColour;
    d.font = h.yLabelFontSize + 'pt ' + h.yLabelFont;
    d.translate(N - h.yTickLength - 2 * h.labelGap - J, (E + y) / 2);
    d.rotate(-Math.PI / 2);
    d.fillText(h.yLabel, 0, 0);
    d.resetTransform();
}
export function max(d) {
    let g = d[0];
    for (let l = 1; l < d.length; l++) g < d[l] && (g = d[l]);
    return g;
}
export function min(d) {
    let g = d[0];
    for (let l = 1; l < d.length; l++) g > d[l] && (g = d[l]);
    return g;
}
export function ptInRect(d, g) {
    return d[0] >= Math.min(g[0], g[2]) && d[0] <= Math.max(g[0], g[2]) && d[1] >= Math.min(g[1], g[3]) && d[1] <= Math.max(g[1], g[3]);
}
export function intersectRect(d, g) {
    return !(Math.min(d[0], d[2]) > Math.max(g[0], g[2]) || Math.max(d[0], d[2]) < Math.min(g[0], g[2]) || Math.min(d[1], d[3]) > Math.max(g[1], g[3]) || Math.max(d[1], d[3]) < Math.min(g[1], g[3]));
}
export function findClosestIdx(d, g) {
    let l = 0,
        n = Math.abs(d[0] - g),
        h = n;
    for (let p = 1; p < d.length; p++) (n = Math.abs(d[p] - g)), n < h && ((l = p), (h = n));
    return l;
}
export function lineIntersectsRect(d, g) {
    let l = ptInRect(d[0], g),
        n = ptInRect(d[1], g);
    if (l && n)
        return {
            within: !0,
            intersectionFound: !1,
            line: [
                [d[0][0], d[0][1]],
                [d[1][0], d[1][1]]
            ]
        };
    let h,
        p = [],
        r = d[0][0],
        y = d[0][1],
        E = d[1][0],
        D = d[1][1];
    if (r != E) {
        let H = (D - y) / (E - r),
            J = y - H * r;
        d = g[0];
        h = H * d + J;
        ptInRect([d, h], [r, y, E, D]) && h >= Math.min(g[1], g[3]) && h <= Math.max(g[1], g[3]) && p.push([d, h]);
        d = g[2];
        h = H * d + J;
        ptInRect([d, h], [r, y, E, D]) && h >= Math.min(g[1], g[3]) && h <= Math.max(g[1], g[3]) && p.push([d, h]);
        h = g[1];
        d = (h - J) / H;
        ptInRect([d, h], [r, y, E, D]) && d >= Math.min(g[0], g[2]) && d <= Math.max(g[0], g[2]) && p.push([d, h]);
        h = g[3];
        d = (h - J) / H;
        ptInRect([d, h], [r, y, E, D]) && d >= Math.min(g[0], g[2]) && d <= Math.max(g[0], g[2]) && p.push([d, h]);
    } else
        (d = r),
            (h = g[1]),
            ((h >= y && h <= D) || (h >= D && h <= y)) && d >= Math.min(g[0], g[2]) && d <= Math.max(g[0], g[2]) && p.push([d, h]),
            (d = r),
            (h = g[3]),
            ((h >= y && h <= D) || (h >= D && h <= y)) && d >= Math.min(g[0], g[2]) && d <= Math.max(g[0], g[2]) && p.push([d, h]);
    1 == p.length ? (l ? ((E = p[0][0]), (D = p[0][1])) : ((r = p[0][0]), (y = p[0][1]))) : 1 < p.length && ((r = p[0][0]), (y = p[0][1]), (E = p[1][0]), (D = p[1][1]));
    return {
        within: l || n,
        intersectionFound: 0 < p.length,
        line: [
            [r, y],
            [E, D]
        ]
    };
}
export const ICPACColourMap = {
        units: 'mm/day',
        values: [0, 1 / 7, 10 / 7, 30 / 7, 50 / 7, 100 / 7, 200 / 7],
        r: [217, 255, 255, 202, 0, 108, 34],
        g: [217, 165, 255, 255, 254, 212, 139],
        b: [217, 0, 0, 112, 0, 3, 34]
    },
    KMDColourMap = {
        units: 'mm/day',
        values: [0, 1, 5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100],
        r: [255, 62, 57, 44, 26, 204, 182, 143, 69, 36, 255, 250, 238, 238, 145],
        g: [255, 246, 217, 186, 143, 235, 217, 194, 167, 129, 200, 167, 111, 0, 0],
        b: [255, 0, 4, 40, 26, 253, 252, 229, 230, 197, 0, 0, 1, 5, 0]
    },
    EMIColourMap = {
        units: 'mm/day',
        values: [0, 1, 5, 10, 20, 30, 50, 75, 100],
        r: [217, 255, 255, 202, 162, 127, 102, 0, 34],
        g: [217, 165, 255, 255, 205, 255, 205, 255, 139],
        b: [217, 0, 0, 112, 90, 0, 0, 0, 34]
    },
    defaultColourMap = {
        units: 'mm/day',
        values: [
            0, 2.4, 2.82103008, 3.31592136, 3.89763096, 4.58138952, 5.38509912, 6.32980296, 7.44023568, 8.7454704, 10.27968192, 12.08303856, 14.20275696, 16.69433592, 19.6230108, 23.06546064, 27.11181696, 31.86802272, 37.45860576, 44.02994088,
            51.75408024, 60.83325936, 71.50519224, 84.04929408, 98.7939984, 116.12535504, 136.49713872, 160.4427288, 188.5890756, 221.67311496, 260.56106232, 306.2710932, 360
        ],
        r: [255, 255, 250, 245, 241, 235, 226, 216, 207, 193, 175, 157, 139, 120, 104, 89, 73, 59, 50, 41, 32, 29, 31, 32, 33, 34, 35, 36, 36, 29, 22, 15, 8],
        g: [255, 255, 253, 251, 249, 247, 243, 239, 236, 231, 223, 216, 209, 202, 196, 191, 185, 176, 167, 158, 148, 136, 123, 110, 97, 85, 74, 64, 53, 46, 40, 34, 29],
        b: [255, 217, 206, 196, 186, 177, 177, 178, 179, 180, 182, 184, 185, 187, 190, 192, 194, 195, 194, 193, 192, 187, 181, 175, 169, 163, 158, 153, 148, 133, 118, 103, 88]
    },
    ICPACProbabilityColourMap = {
        units: '%',
        values: [0, 2.5, 25, 50, 75, 100],
        r: [217, 255, 255, 0, 34],
        g: [217, 165, 255, 254, 139],
        b: [217, 0, 0, 0, 34]
    },
    KMDProbabilityColourMap = {
        units: '%',
        values: [0, 2.5, 25, 50, 75, 100],
        r: [255, 62, 36, 255, 238],
        g: [255, 246, 129, 200, 0],
        b: [255, 0, 197, 0, 5]
    },
    EMIProbabilityColourMap = {
        units: '%',
        values: [0, 2.5, 25, 50, 75, 100],
        r: [217, 255, 255, 162, 34],
        g: [217, 165, 255, 205, 139],
        b: [217, 0, 0, 90, 34]
    },
    defaultProbabilityColourMap = {
        units: '%',
        values: [0, 2.5, 25, 50, 75, 100],
        r: [255, 198, 64, 34, 8],
        g: [255, 233, 181, 93, 29],
        b: [217, 180, 196, 168, 88]
    };
export function getColourMap(d, g) {
    g
        ? ((g = defaultProbabilityColourMap), 'ICPAC' == d ? (g = ICPACProbabilityColourMap) : 'KMD' == d ? (g = KMDProbabilityColourMap) : 'EMI' == d && (g = EMIProbabilityColourMap))
        : ((g = defaultColourMap), 'ICPAC' == d ? (g = ICPACColourMap) : 'KMD' == d ? (g = KMDColourMap) : 'EMI' == d && (g = EMIColourMap));
    return g;
}
export function getPlotNormalisation(d) {
    let g = 1;
    'mm/h' == d ? (g = 1) : 'mm/6h' == d ? (g = 6) : 'mm/day' == d ? (g = 24) : 'mm/week' == d ? (g = 168) : console.log('ERROR: Unknown units ' + d + ' specified.');
    return g;
}
export class NDArray {
    constructor(d, g) {
        this.shape = d.concat();
        this.values = g.flat(Infinity).concat();
    }
    plus(d) {
        let g = new NDArray(this.shape, this.values);
        if ('number' == typeof d) for (var l = 0; l < g.values.length; l++) g.values[l] += d;
        else for (l = 0; l < g.values.length; l++) g.values[l] += d.values[l];
        return g;
    }
    times(d) {
        let g = new NDArray(this.shape, this.values);
        if ('number' == typeof d) for (var l = 0; l < g.values.length; l++) g.values[l] *= d;
        else for (l = 0; l < g.values.length; l++) g.values[l] *= d.values[l];
        return g;
    }
    sum(d) {
        var g = Array(this.shape.length - 1),
            l = 0,
            n = 1;
        for (var h = 0; h < this.shape.length; h++) h != d && ((g[l] = this.shape[h]), (l += 1), (n *= this.shape[h]));
        l = Array(n);
        l.fill(0);
        g = new NDArray(g, l);
        l = 1;
        for (n = d + 1; n < this.shape.length; n++) l *= this.shape[n];
        n = 1;
        for (h = 0; h < d; h++) n *= this.shape[h];
        for (h = 0; h < n; h++) for (let p = 0; p < this.shape[d]; p++) for (let r = 0; r < l; r++) g.values[h * l + r] += this.values[h * this.shape[d] * l + p * l + r];
        return g;
    }
    flip(d) {
        let g = new NDArray(this.shape, this.values),
            l = 1;
        for (var n = d + 1; n < this.shape.length; n++) l *= this.shape[n];
        n = 1;
        for (var h = 0; h < d; h++) n *= this.shape[h];
        for (h = 0; h < n; h++) for (let p = 0; p < this.shape[d]; p++) for (let r = 0; r < l; r++) g.values[h * this.shape[d] * l + (this.shape[d] - 1 - p) * l + r] = this.values[h * this.shape[d] * l + p * l + r];
        return g;
    }
    moveaxis(d) {
        let g = new NDArray(this.shape, this.values);
        for (var l = 0; l < this.shape.length; l++) g.shape[d[l]] = this.shape[l];
        l = [];
        for (var n = 0; n < this.shape.length; n++) l[n] = [d[n], n];
        l.sort(function (h, p) {
            return h[0] - p[0];
        });
        d = Array(this.shape.length);
        d[l[l.length - 1][1]] = 1;
        for (n = this.shape.length - 1; 0 < n; n--) d[l[n - 1][1]] = d[l[n][1]] * g.shape[n];
        this.moveaxisRecursive(g, [], d);
        return g;
    }
    moveaxisRecursive(d, g, l) {
        let n = g.length;
        if (n == this.shape.length - 1) {
            var h = 0;
            let r = 1;
            var p = 0;
            for (let y = n; 0 < y; y--) (r *= this.shape[y]), (h += g[y - 1] * r), (p += g[y - 1] * l[y - 1]);
            for (g = 0; g < this.shape[n]; g++) d.values[p + g * l[n]] = this.values[h + g];
        } else for (h = g.concat(), p = 0; p < this.shape[n]; p++) (h[n] = p), this.moveaxisRecursive(d, h, l);
    }
    slice(d, g, l) {
        let n = this.shape.concat();
        n[d] = l - g;
        let h = 1;
        for (var p = 0; p < d; p++) h *= this.shape[p];
        p = 1;
        for (var r = d + 1; r < n.length; r++) p *= this.shape[r];
        r = [];
        for (let y = 0; y < h; y++) r = r.concat(this.values.slice((y * this.shape[d] + g) * p, (y * this.shape[d] + l) * p));
        return new NDArray(n, r);
    }
}
export class regionShapes {
    constructor() {
        this.regionNames = [];
        this.lakes = [];
        this.countryBorders = [];
        this.countryRegions = [];
    }
    async loadJSON(d) {
        d = await fetch(d);
        if (!d.ok) throw Error(`Response status: ${d.status}`);
        return await d.json();
    }
    async loadRegionNames(d, g) {
        0 == this.regionNames.length &&
            (console.log('Loading region names (should happen only once)'),
            statusUpdate(1, 'Loading region specification ...'),
            (this.regionNames = await this.loadJSON('/' + d + '/' + g)),
            (this.path = '/' + d),
            statusUpdate(0, 'Region specification loaded.'));
    }
    async loadLakes() {
        0 == this.lakes.length && (console.log('Loading lakes (should happen only once)'), statusUpdate(1, 'Loading lakes ...'), (this.lakes = await this.loadJSON(this.path + '/regional_lakes.json')), statusUpdate(0, 'Lakes loaded.'));
    }
    async loadAllCountryBorders() {
        if (this.countryBorders.length < this.regionNames.length) {
            console.log('Loading country borders (should happen only once)');
            statusUpdate(1, 'Loading borders ...');
            for (let d = 0; d < this.regionNames.length; d++) {
                let g = this.regionNames[d].country;
                this.countryBorders.push(await this.loadJSON(this.path + '/' + g + '/' + g + '_border.json'));
            }
            statusUpdate(0, 'Borders loaded.');
        }
    }
    async loadAllRegionBorders(d) {
        var g = !1;
        for (var l = 0; l < this.countryRegions.length; l++)
            if (void 0 != this.countryRegions[l] && this.countryRegions[l].country == d) {
                g = !0;
                break;
            }
        if (0 == g) {
            console.log('Loading regions in ' + d + ' (should happen only once)');
            statusUpdate(1, 'Loading regions in ' + d + ' ...');
            g = this.getCountryIdx(d);
            l = this.getCountryIdx(d);
            this.countryRegions[l] = {
                country: d,
                regionBorders: []
            };
            for (let n = 0; n < this.regionNames[g].region.length; n++) this.countryRegions[l].regionBorders.push(await this.loadJSON(this.path + '/' + d + '/' + this.regionNames[g].region[n] + '_boundary.json'));
            statusUpdate(0, 'Regions in ' + d + ' loaded.');
        }
    }
    getCountryIdx(d) {
        let g = -1;
        for (let l = 0; l < this.regionNames.length; l++)
            if (this.regionNames[l].country == d) {
                g = l;
                break;
            }
        0 > g && console.log('WARNING: ' + d + ' not found in getCountryIdx.');
        return g;
    }
    drawRegion(d, g, l, n, h, p, r) {
        if (intersectRect([h[0], n[0], h[1], n[1]], g.bounding_box)) {
            let y = (l[2] - l[0]) / (h[1] - h[0]),
                E = -(l[3] - l[1]) / (n[1] - n[0]);
            h = l[0] - h[0] * y;
            n = l[1] - n[1] * E;
            d.strokeStyle = p;
            d.lineWidth = r;
            g = g.line;
            let D, H;
            for (let J = 0; J < g.length; J++) {
                let O = !1;
                for (let M = 1; M < g[J][0].length; M++) {
                    p = g[J][0][M - 1] * y + h;
                    r = g[J][1][M - 1] * E + n;
                    D = g[J][0][M] * y + h;
                    H = g[J][1][M] * E + n;
                    let I = lineIntersectsRect(
                        [
                            [p, r],
                            [D, H]
                        ],
                        l
                    );
                    I.within && !I.intersectionFound
                        ? (0 == O && ((O = !0), d.beginPath(), d.moveTo(p, r)), d.lineTo(D, H))
                        : I.intersectionFound &&
                          ((p = I.line[0][0]),
                          (r = I.line[0][1]),
                          (D = I.line[1][0]),
                          (H = I.line[1][1]),
                          0 == O ? (I.within ? ((O = !0), d.beginPath(), d.moveTo(p, r), d.lineTo(D, H)) : (d.beginPath(), d.moveTo(p, r), d.lineTo(D, H), d.stroke())) : ((O = !1), d.lineTo(D, H), d.stroke()));
                }
                O && d.stroke();
            }
        }
    }
    async drawRegionList(d, g, l, n, h, p, r) {
        if ('ICPAC' == r.toUpperCase() || 'all' == r.toLowerCase() || 'East Africa' == r) for (await this.loadAllCountryBorders(), r = 0; r < this.countryBorders.length; r++) this.drawRegion(d, this.countryBorders[r], g, l, n, h, p);
        else {
            await this.loadAllRegionBorders(r);
            r = this.getCountryIdx(r);
            r = this.countryRegions[r].regionBorders;
            for (let y = 0; y < r.length; y++) this.drawRegion(d, r[y], g, l, n, h, p);
        }
    }
    async drawLakes(d, g, l, n, h, p) {
        await this.loadLakes();
        for (let r = 0; r < this.lakes.length; r++) this.drawRegion(d, this.lakes[r], g, l, n, h, p);
    }
}
export class countsData {
    constructor() {
        this.exceedanceProbabilityCalculated = this.dataLoaded = !1;
        this.exceedanceProbabilityThreshold = 0;
        this.exceedanceValueCalculated = !1;
        this.exceedanceProbabilityValue = 0;
        this.regionSpec = new regionShapes();
    }
    async loadGANForecast(d, g, l) {
        statusUpdate(1, 'Loading ' + d + ' ...');
        this.exceedanceValueCalculated = this.exceedanceProbabilityCalculated = this.dataLoaded = !1;
        var n = await fetch(d);
        if (!n.ok) throw Error(`Response status: ${n.status}`);
        n = await n.arrayBuffer();
        n = new hdf5.File(n, d);
        var h = n.get('time').value;
        this.time = timeOffsetToDate(h, '1900-01-01T00:00:00Z');
        h = n.get('valid_time').value;
        this.validTime = timeOffsetToDate(h, '1900-01-01T00:00:00Z');
        this.ensembleMembers = n.get('counts').attrs.num_members[0];
        this.latitude = n.get('latitude').value;
        this.longitude = n.get('longitude').value;
        this.bins = n.get('bins').value;
        this.bins.unshift(0);
        this.bins.push(1e3);
        this.counts = new NDArray(n.get('counts').shape, n.get('counts').value);
        this.computeAndAddFirstBin();
        this.counts = this.counts.moveaxis([2, 0, 1]);
        this.fileName = d;
        this.modelName = g;
        this.accumulationHours = l;
        this.dataLoaded = !0;
        statusUpdate(0, d + ' loaded.');
    }
    computeAndAddFirstBin() {
        let d = this.counts.sum(0).times(-1).plus(this.ensembleMembers).values.concat(this.counts.values),
            g = this.counts.shape.concat();
        g[0] += 1;
        this.counts = new NDArray(g, d);
    }
    precipExceedanceProbability(d) {
        if (0 == this.exceedanceProbabilityCalculated || this.exceedanceProbabilityThreshold != d) {
            console.log('Computing exceedance probability (should happen only once per threshold)');
            statusUpdate(2, 'Computing exceedance probability ...');
            var g = d;
            d > this.bins[this.bins.length - 2] && (g = this.bins[this.bins.length - 2]);
            let n = 0;
            for (var l = 0; l < this.bins.length - 2 && !((n += 1), this.bins[l] >= d); l++);
            g = 1 - (this.bins[n] - g) / (this.bins[n] - this.bins[n - 1]);
            l = this.longitude.length;
            let h = this.latitude.length,
                p = Array(l * h).fill(0);
            for (let r = 0; r < h; r++)
                for (let y = 0; y < l; y++) {
                    let E = (r * l + y) * this.counts.shape[2],
                        D = Math.floor(this.counts.values[E + n - 1] * g);
                    for (let H = 0; H < n - 1; H++) D += this.counts.values[E + H];
                    p[r * l + y] = 1 - D / this.ensembleMembers;
                }
            this.precipExceedanceProbability2DArray = new NDArray([h, l], p);
            this.exceedanceProbabilityCalculated = !0;
            this.exceedanceProbabilityThreshold = d;
            statusUpdate(0, 'Exceedance probabilities computed.');
        }
        return this.precipExceedanceProbability2DArray;
    }
    precipExceedanceValue(d) {
        if (0 == this.exceedanceValueCalculated || this.exceedanceProbabilityValue != d) {
            console.log('Computing exceedance value (should happen only once per threshold)');
            statusUpdate(2, 'Computing exceedance value ...');
            1 < d ? (d = 1) : 0 > d && (d = 0);
            let l = this.longitude.length,
                n = this.latitude.length,
                h = Array(l * n).fill(0);
            for (let p = 0; p < n; p++)
                for (let r = 0; r < l; r++) {
                    var g = (p * l + r) * this.counts.shape[2];
                    let y = 0,
                        E = 0;
                    for (; y <= d * this.ensembleMembers; ) (y += this.counts.values[g + E]), (E += 1);
                    g = (d * this.ensembleMembers - (y - this.counts.values[g + E - 1])) / this.counts.values[g + E - 1];
                    h[p * l + r] = this.bins[E - 1] * (1 - g) + this.bins[E] * g;
                }
            this.valueAtProbability2DArray = new NDArray([n, l], h);
            this.exceedanceValueCalculated = !0;
            this.exceedanceProbabilityValue = d;
            statusUpdate(0, 'Exceedance values computed.');
        }
        return this.valueAtProbability2DArray;
    }
    computeLatLonIdxBounds(d) {
        if ('ICPAC' == d.toUpperCase() || 'all' == d.toLowerCase() || 'East Africa' == d) {
            d = 0;
            var g = this.latitude.length;
            var l = 0;
            var n = this.longitude.length;
        } else
            (d = this.regionSpec.getCountryIdx(d)),
                (g = this.regionSpec.regionNames[d].bounding_box[3] + 0.5),
                (l = this.regionSpec.regionNames[d].bounding_box[0] - 0.5),
                (n = this.regionSpec.regionNames[d].bounding_box[2] + 0.5),
                (d = findClosestIdx(this.latitude, this.regionSpec.regionNames[d].bounding_box[1] - 0.5)),
                (g = findClosestIdx(this.latitude, g)),
                (l = findClosestIdx(this.longitude, l)),
                (n = findClosestIdx(this.longitude, n));
        return [d, g, l, n];
    }
    async makePlot(d, g, l, n, h, p, r, y) {
        statusUpdate(3, 'Plotting map ...');
        p = fillOutPlotSpecification(p);
        p.aspectRatio = 'equal';
        p.drawRegions = !0;
        p.drawLakes = !0;
        p.regionSpec = this.regionSpec;
        let E = p.regionName;
        if ('ICPAC' == E.toUpperCase() || 'all' == E.toLowerCase()) E = 'East Africa';
        let [D, H, J, O] = this.computeLatLonIdxBounds(E);
        r = r.slice(0, D, H).slice(1, J, O);
        let M = this.latitude.slice(D, H),
            I = this.longitude.slice(J, O);
        y = [this.modelName + ' forecast: ' + E, y, makeInitialisationTimeStr(this.time), makeValidTimeStr(this.validTime, this.accumulationHours)];
        p.titleSpec.titleArray = y;
        d = await pcolormesh(d, [g, l, g + n, l + h], I, M, r, p);
        statusUpdate(0, 'Map plotted.');
        return d;
    }
    async plotExceedenceProbability(d, g, l, n, h, p, r, y, E, D) {
        let H = new plotSpecification();
        H.regionName = D;
        H.colourMap = getColourMap(y, !0);
        D = getPlotNormalisation(r);
        y = this.precipExceedanceProbability(p).times(100);
        p = 'Chance of rainfall above ' + roundSF(p * D, 3) + ' ' + r;
        H.colourBarSpec.tickLabels = E ? '0% 2.5% 25% 50% 75% 100%'.split(' ') : 'None Very-Low Low Medium High Certain'.split(' ');
        H.colourBarSpec.showColourBar = !0;
        H.colourBarSpec.label = '';
        return await this.makePlot(d, g, l, n, h, H, y, p);
    }
    async plotExceedenceValue(d, g, l, n, h, p, r, y, E) {
        let D = new plotSpecification();
        D.regionName = E;
        D.colourMap = getColourMap(y, !1);
        y = getPlotNormalisation(r);
        E = this.precipExceedanceValue(p);
        p = round(100 * p, 1) + '% chance of rainfall below the plotted value.';
        E = E.times(y);
        D.colourBarSpec.normalisation = y / 24;
        D.colourBarSpec.showColourBar = !0;
        D.colourBarSpec.label = 'Rainfall (' + r + ')';
        return await this.makePlot(d, g, l, n, h, D, E, p);
    }
    async plotHistogram(d, g, l, n, h, p, r, y, E, D, H) {
        let J = this.counts.slice(0, y, y + 1).slice(1, E, E + 1),
            O = getPlotNormalisation(D),
            M = Array(this.bins.length);
        for (let I = 0; I < this.bins.length - 1; I++) M[I] = this.bins[I] * O;
        M[M.length - 1] = 'Inf';
        H = fillOutBarChartSpecification(H);
        H.xLabel = 'Rainfall (' + D + ')';
        H.yLabel = 'Number of ensemble members';
        H.titleArray = [this.modelName + ' forecast at latitude ' + round(this.latitude[y], 2) + ', longitude ' + round(this.longitude[E], 2), makeInitialisationTimeStr(this.time), makeValidTimeStr(this.validTime, this.accumulationHours)];
        H.titleTextAlign = 'left';
        H.drawThresholdProbability = !0;
        H.thresholdProbability = r;
        H.drawThresholdValue = !0;
        H.thresholdValue = p * O;
        H.dataUnits = D;
        H.xTickLabelRotated = !0;
        p = this.precipExceedanceProbability(p);
        H.exceedanceProbability = p.values[y * this.longitude.length + E];
        r = this.precipExceedanceValue(r);
        H.exceedanceValue = r.values[y * this.longitude.length + E] * O;
        barChart(d, [g, l, g + n, l + h], J.values, M, H);
    }
}
export let userStatusUpdateFunction;
export function setStatusUpdateFunction(d) {
    userStatusUpdateFunction = d;
}
export function statusUpdate(d, g) {
    void 0 != userStatusUpdateFunction && userStatusUpdateFunction(d, g);
}

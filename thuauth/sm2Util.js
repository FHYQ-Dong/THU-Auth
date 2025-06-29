function fillArray(obj, value) {
	for (var i = 0; i < obj.length; i++) {
		obj[i] = value;
	}
	return obj;
}
var sm2Util = (function (t) {
	function r(e) {
		if (i[e]) return i[e].exports;
		var n = (i[e] = { i: e, l: !1, exports: {} });
		return t[e].call(n.exports, n, n.exports, r), (n.l = !0), n.exports;
	}
	var i = {};
	return (
		(r.m = t),
		(r.c = i),
		(r.d = function (t, i, e) {
			r.o(t, i) ||
				Object.defineProperty(t, i, {
					configurable: !1,
					enumerable: !0,
					get: e,
				});
		}),
		(r.n = function (t) {
			var i =
				t && t.__esModule
					? function () {
							return t.default;
					  }
					: function () {
							return t;
					  };
			return r.d(i, "a", i), i;
		}),
		(r.o = function (t, r) {
			return Object.prototype.hasOwnProperty.call(t, r);
		}),
		(r.p = ""),
		r((r.s = 2))
	);
})([
	function (t, r, i) {
		"use strict";
		(function () {
			function i(t, r, i) {
				null != t &&
					("number" == typeof t
						? this.fromNumber(t, r, i)
						: null == r && "string" != typeof t
						? this.fromString(t, 256)
						: this.fromString(t, r));
			}
			function e() {
				return new i(null);
			}
			function n(t, r, i, e, n, o) {
				for (; --o >= 0; ) {
					var s = r * this[t++] + i[e] + n;
					(n = Math.floor(s / 67108864)), (i[e++] = 67108863 & s);
				}
				return n;
			}
			function o(t, r, i, e, n, o) {
				for (var s = 32767 & r, u = r >> 15; --o >= 0; ) {
					var h = 32767 & this[t],
						a = this[t++] >> 15,
						f = u * h + a * s;
					(h = s * h + ((32767 & f) << 15) + i[e] + (1073741823 & n)),
						(n = (h >>> 30) + (f >>> 15) + u * a + (n >>> 30)),
						(i[e++] = 1073741823 & h);
				}
				return n;
			}
			function s(t, r, i, e, n, o) {
				for (var s = 16383 & r, u = r >> 14; --o >= 0; ) {
					var h = 16383 & this[t],
						a = this[t++] >> 14,
						f = u * h + a * s;
					(h = s * h + ((16383 & f) << 14) + i[e] + n),
						(n = (h >> 28) + (f >> 14) + u * a),
						(i[e++] = 268435455 & h);
				}
				return n;
			}
			function u(t) {
				return pr.charAt(t);
			}
			function h(t, r) {
				var i = vr[t.charCodeAt(r)];
				return null == i ? -1 : i;
			}
			function a(t) {
				for (var r = this.t - 1; r >= 0; --r) t[r] = this[r];
				(t.t = this.t), (t.s = this.s);
			}
			function f(t) {
				(this.t = 1),
					(this.s = t < 0 ? -1 : 0),
					t > 0
						? (this[0] = t)
						: t < -1
						? (this[0] = t + this.DV)
						: (this.t = 0);
			}
			function c(t) {
				var r = e();
				return r.fromInt(t), r;
			}
			function l(t, r) {
				var e;
				if (16 == r) e = 4;
				else if (8 == r) e = 3;
				else if (256 == r) e = 8;
				else if (2 == r) e = 1;
				else if (32 == r) e = 5;
				else {
					if (4 != r) return void this.fromRadix(t, r);
					e = 2;
				}
				(this.t = 0), (this.s = 0);
				for (var n = t.length, o = !1, s = 0; --n >= 0; ) {
					var u = 8 == e ? 255 & t[n] : h(t, n);
					u < 0
						? "-" == t.charAt(n) && (o = !0)
						: ((o = !1),
						  0 == s
								? (this[this.t++] = u)
								: s + e > this.DB
								? ((this[this.t - 1] |=
										(u & ((1 << (this.DB - s)) - 1)) << s),
								  (this[this.t++] = u >> (this.DB - s)))
								: (this[this.t - 1] |= u << s),
						  (s += e) >= this.DB && (s -= this.DB));
				}
				8 == e &&
					0 != (128 & t[0]) &&
					((this.s = -1),
					s > 0 &&
						(this[this.t - 1] |= ((1 << (this.DB - s)) - 1) << s)),
					this.clamp(),
					o && i.ZERO.subTo(this, this);
			}
			function p() {
				for (
					var t = this.s & this.DM;
					this.t > 0 && this[this.t - 1] == t;

				)
					--this.t;
			}
			function v(t) {
				if (this.s < 0) return "-" + this.negate().toString(t);
				var r;
				if (16 == t) r = 4;
				else if (8 == t) r = 3;
				else if (2 == t) r = 1;
				else if (32 == t) r = 5;
				else {
					if (4 != t) return this.toRadix(t);
					r = 2;
				}
				var i,
					e = (1 << r) - 1,
					n = !1,
					o = "",
					s = this.t,
					h = this.DB - ((s * this.DB) % r);
				if (s-- > 0)
					for (
						h < this.DB &&
						(i = this[s] >> h) > 0 &&
						((n = !0), (o = u(i)));
						s >= 0;

					)
						h < r
							? ((i = (this[s] & ((1 << h) - 1)) << (r - h)),
							  (i |= this[--s] >> (h += this.DB - r)))
							: ((i = (this[s] >> (h -= r)) & e),
							  h <= 0 && ((h += this.DB), --s)),
							i > 0 && (n = !0),
							n && (o += u(i));
				return n ? o : "0";
			}
			function y() {
				var t = e();
				return i.ZERO.subTo(this, t), t;
			}
			function g() {
				return this.s < 0 ? this.negate() : this;
			}
			function d(t) {
				var r = this.s - t.s;
				if (0 != r) return r;
				var i = this.t;
				if (0 != (r = i - t.t)) return this.s < 0 ? -r : r;
				for (; --i >= 0; ) if (0 != (r = this[i] - t[i])) return r;
				return 0;
			}
			function m(t) {
				var r,
					i = 1;
				return (
					0 != (r = t >>> 16) && ((t = r), (i += 16)),
					0 != (r = t >> 8) && ((t = r), (i += 8)),
					0 != (r = t >> 4) && ((t = r), (i += 4)),
					0 != (r = t >> 2) && ((t = r), (i += 2)),
					0 != (r = t >> 1) && ((t = r), (i += 1)),
					i
				);
			}
			function T() {
				return this.t <= 0
					? 0
					: this.DB * (this.t - 1) +
							m(this[this.t - 1] ^ (this.s & this.DM));
			}
			function b(t, r) {
				var i;
				for (i = this.t - 1; i >= 0; --i) r[i + t] = this[i];
				for (i = t - 1; i >= 0; --i) r[i] = 0;
				(r.t = this.t + t), (r.s = this.s);
			}
			function F(t, r) {
				for (var i = t; i < this.t; ++i) r[i - t] = this[i];
				(r.t = Math.max(this.t - t, 0)), (r.s = this.s);
			}
			function w(t, r) {
				var i,
					e = t % this.DB,
					n = this.DB - e,
					o = (1 << n) - 1,
					s = Math.floor(t / this.DB),
					u = (this.s << e) & this.DM;
				for (i = this.t - 1; i >= 0; --i)
					(r[i + s + 1] = (this[i] >> n) | u),
						(u = (this[i] & o) << e);
				for (i = s - 1; i >= 0; --i) r[i] = 0;
				(r[s] = u), (r.t = this.t + s + 1), (r.s = this.s), r.clamp();
			}
			function B(t, r) {
				r.s = this.s;
				var i = Math.floor(t / this.DB);
				if (i >= this.t) return void (r.t = 0);
				var e = t % this.DB,
					n = this.DB - e,
					o = (1 << e) - 1;
				r[0] = this[i] >> e;
				for (var s = i + 1; s < this.t; ++s)
					(r[s - i - 1] |= (this[s] & o) << n),
						(r[s - i] = this[s] >> e);
				e > 0 && (r[this.t - i - 1] |= (this.s & o) << n),
					(r.t = this.t - i),
					r.clamp();
			}
			function x(t, r) {
				for (var i = 0, e = 0, n = Math.min(t.t, this.t); i < n; )
					(e += this[i] - t[i]),
						(r[i++] = e & this.DM),
						(e >>= this.DB);
				if (t.t < this.t) {
					for (e -= t.s; i < this.t; )
						(e += this[i]), (r[i++] = e & this.DM), (e >>= this.DB);
					e += this.s;
				} else {
					for (e += this.s; i < t.t; )
						(e -= t[i]), (r[i++] = e & this.DM), (e >>= this.DB);
					e -= t.s;
				}
				(r.s = e < 0 ? -1 : 0),
					e < -1 ? (r[i++] = this.DV + e) : e > 0 && (r[i++] = e),
					(r.t = i),
					r.clamp();
			}
			function S(t, r) {
				var e = this.abs(),
					n = t.abs(),
					o = e.t;
				for (r.t = o + n.t; --o >= 0; ) r[o] = 0;
				for (o = 0; o < n.t; ++o)
					r[o + e.t] = e.am(0, n[o], r, o, 0, e.t);
				(r.s = 0), r.clamp(), this.s != t.s && i.ZERO.subTo(r, r);
			}
			function D(t) {
				for (var r = this.abs(), i = (t.t = 2 * r.t); --i >= 0; )
					t[i] = 0;
				for (i = 0; i < r.t - 1; ++i) {
					var e = r.am(i, r[i], t, 2 * i, 0, 1);
					(t[i + r.t] += r.am(
						i + 1,
						2 * r[i],
						t,
						2 * i + 1,
						e,
						r.t - i - 1
					)) >= r.DV && ((t[i + r.t] -= r.DV), (t[i + r.t + 1] = 1));
				}
				t.t > 0 && (t[t.t - 1] += r.am(i, r[i], t, 2 * i, 0, 1)),
					(t.s = 0),
					t.clamp();
			}
			function I(t, r, n) {
				var o = t.abs();
				if (!(o.t <= 0)) {
					var s = this.abs();
					if (s.t < o.t)
						return (
							null != r && r.fromInt(0),
							void (null != n && this.copyTo(n))
						);
					null == n && (n = e());
					var u = e(),
						h = this.s,
						a = t.s,
						f = this.DB - m(o[o.t - 1]);
					f > 0
						? (o.lShiftTo(f, u), s.lShiftTo(f, n))
						: (o.copyTo(u), s.copyTo(n));
					var c = u.t,
						l = u[c - 1];
					if (0 != l) {
						var p =
								l * (1 << this.F1) +
								(c > 1 ? u[c - 2] >> this.F2 : 0),
							v = this.FV / p,
							y = (1 << this.F1) / p,
							g = 1 << this.F2,
							d = n.t,
							T = d - c,
							b = null == r ? e() : r;
						for (
							u.dlShiftTo(T, b),
								n.compareTo(b) >= 0 &&
									((n[n.t++] = 1), n.subTo(b, n)),
								i.ONE.dlShiftTo(c, b),
								b.subTo(u, u);
							u.t < c;

						)
							u[u.t++] = 0;
						for (; --T >= 0; ) {
							var F =
								n[--d] == l
									? this.DM
									: Math.floor(n[d] * v + (n[d - 1] + g) * y);
							if ((n[d] += u.am(0, F, n, T, 0, c)) < F)
								for (
									u.dlShiftTo(T, b), n.subTo(b, n);
									n[d] < --F;

								)
									n.subTo(b, n);
						}
						null != r &&
							(n.drShiftTo(c, r), h != a && i.ZERO.subTo(r, r)),
							(n.t = c),
							n.clamp(),
							f > 0 && n.rShiftTo(f, n),
							h < 0 && i.ZERO.subTo(n, n);
					}
				}
			}
			function E(t) {
				var r = e();
				return (
					this.abs().divRemTo(t, null, r),
					this.s < 0 && r.compareTo(i.ZERO) > 0 && t.subTo(r, r),
					r
				);
			}
			function q(t) {
				this.m = t;
			}
			function A(t) {
				return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
			}
			function P(t) {
				return t;
			}
			function O(t) {
				t.divRemTo(this.m, null, t);
			}
			function R(t, r, i) {
				t.multiplyTo(r, i), this.reduce(i);
			}
			function M(t, r) {
				t.squareTo(r), this.reduce(r);
			}
			function k() {
				if (this.t < 1) return 0;
				var t = this[0];
				if (0 == (1 & t)) return 0;
				var r = 3 & t;
				return (
					(r = (r * (2 - (15 & t) * r)) & 15),
					(r = (r * (2 - (255 & t) * r)) & 255),
					(r = (r * (2 - (((65535 & t) * r) & 65535))) & 65535),
					(r = (r * (2 - ((t * r) % this.DV))) % this.DV),
					r > 0 ? this.DV - r : -r
				);
			}
			function C(t) {
				(this.m = t),
					(this.mp = t.invDigit()),
					(this.mpl = 32767 & this.mp),
					(this.mph = this.mp >> 15),
					(this.um = (1 << (t.DB - 15)) - 1),
					(this.mt2 = 2 * t.t);
			}
			function H(t) {
				var r = e();
				return (
					t.abs().dlShiftTo(this.m.t, r),
					r.divRemTo(this.m, null, r),
					t.s < 0 && r.compareTo(i.ZERO) > 0 && this.m.subTo(r, r),
					r
				);
			}
			function V(t) {
				var r = e();
				return t.copyTo(r), this.reduce(r), r;
			}
			function N(t) {
				for (; t.t <= this.mt2; ) t[t.t++] = 0;
				for (var r = 0; r < this.m.t; ++r) {
					var i = 32767 & t[r],
						e =
							(i * this.mpl +
								(((i * this.mph + (t[r] >> 15) * this.mpl) &
									this.um) <<
									15)) &
							t.DM;
					for (
						i = r + this.m.t,
							t[i] += this.m.am(0, e, t, r, 0, this.m.t);
						t[i] >= t.DV;

					)
						(t[i] -= t.DV), t[++i]++;
				}
				t.clamp(),
					t.drShiftTo(this.m.t, t),
					t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
			}
			function j(t, r) {
				t.squareTo(r), this.reduce(r);
			}
			function L(t, r, i) {
				t.multiplyTo(r, i), this.reduce(i);
			}
			function z() {
				return 0 == (this.t > 0 ? 1 & this[0] : this.s);
			}
			function K(t, r) {
				if (t > 4294967295 || t < 1) return i.ONE;
				var n = e(),
					o = e(),
					s = r.convert(this),
					u = m(t) - 1;
				for (s.copyTo(n); --u >= 0; )
					if ((r.sqrTo(n, o), (t & (1 << u)) > 0)) r.mulTo(o, s, n);
					else {
						var h = n;
						(n = o), (o = h);
					}
				return r.revert(n);
			}
			function Z(t, r) {
				var i;
				return (
					(i = t < 256 || r.isEven() ? new q(r) : new C(r)),
					this.exp(t, i)
				);
			}
			function _() {
				var t = e();
				return this.copyTo(t), t;
			}
			function U() {
				if (this.s < 0) {
					if (1 == this.t) return this[0] - this.DV;
					if (0 == this.t) return -1;
				} else {
					if (1 == this.t) return this[0];
					if (0 == this.t) return 0;
				}
				return (
					((this[1] & ((1 << (32 - this.DB)) - 1)) << this.DB) |
					this[0]
				);
			}
			function X() {
				return 0 == this.t ? this.s : (this[0] << 24) >> 24;
			}
			function Y() {
				return 0 == this.t ? this.s : (this[0] << 16) >> 16;
			}
			function G(t) {
				return Math.floor((Math.LN2 * this.DB) / Math.log(t));
			}
			function J() {
				return this.s < 0
					? -1
					: this.t <= 0 || (1 == this.t && this[0] <= 0)
					? 0
					: 1;
			}
			function Q(t) {
				if (
					(null == t && (t = 10),
					0 == this.signum() || t < 2 || t > 36)
				)
					return "0";
				var r = this.chunkSize(t),
					i = Math.pow(t, r),
					n = c(i),
					o = e(),
					s = e(),
					u = "";
				for (this.divRemTo(n, o, s); o.signum() > 0; )
					(u = (i + s.intValue()).toString(t).substr(1) + u),
						o.divRemTo(n, o, s);
				return s.intValue().toString(t) + u;
			}
			function W(t, r) {
				this.fromInt(0), null == r && (r = 10);
				for (
					var e = this.chunkSize(r),
						n = Math.pow(r, e),
						o = !1,
						s = 0,
						u = 0,
						a = 0;
					a < t.length;
					++a
				) {
					var f = h(t, a);
					f < 0
						? "-" == t.charAt(a) && 0 == this.signum() && (o = !0)
						: ((u = r * u + f),
						  ++s >= e &&
								(this.dMultiply(n),
								this.dAddOffset(u, 0),
								(s = 0),
								(u = 0)));
				}
				s > 0 &&
					(this.dMultiply(Math.pow(r, s)), this.dAddOffset(u, 0)),
					o && i.ZERO.subTo(this, this);
			}
			function $(t, r, e) {
				if ("number" == typeof r)
					if (t < 2) this.fromInt(1);
					else
						for (
							this.fromNumber(t, e),
								this.testBit(t - 1) ||
									this.bitwiseTo(
										i.ONE.shiftLeft(t - 1),
										ut,
										this
									),
								this.isEven() && this.dAddOffset(1, 0);
							!this.isProbablePrime(r);

						)
							this.dAddOffset(2, 0),
								this.bitLength() > t &&
									this.subTo(i.ONE.shiftLeft(t - 1), this);
				else {
					var n = new Array(),
						o = 7 & t;
					(n.length = 1 + (t >> 3)),
						r.nextBytes(n),
						o > 0 ? (n[0] &= (1 << o) - 1) : (n[0] = 0),
						this.fromString(n, 256);
				}
			}
			function tt() {
				var t = this.t,
					r = new Array();
				r[0] = this.s;
				var i,
					e = this.DB - ((t * this.DB) % 8),
					n = 0;
				if (t-- > 0)
					for (
						e < this.DB &&
						(i = this[t] >> e) != (this.s & this.DM) >> e &&
						(r[n++] = i | (this.s << (this.DB - e)));
						t >= 0;

					)
						e < 8
							? ((i = (this[t] & ((1 << e) - 1)) << (8 - e)),
							  (i |= this[--t] >> (e += this.DB - 8)))
							: ((i = (this[t] >> (e -= 8)) & 255),
							  e <= 0 && ((e += this.DB), --t)),
							0 != (128 & i) && (i |= -256),
							0 == n && (128 & this.s) != (128 & i) && ++n,
							(n > 0 || i != this.s) && (r[n++] = i);
				return r;
			}
			function rt(t) {
				return 0 == this.compareTo(t);
			}
			function it(t) {
				return this.compareTo(t) < 0 ? this : t;
			}
			function et(t) {
				return this.compareTo(t) > 0 ? this : t;
			}
			function nt(t, r, i) {
				var e,
					n,
					o = Math.min(t.t, this.t);
				for (e = 0; e < o; ++e) i[e] = r(this[e], t[e]);
				if (t.t < this.t) {
					for (n = t.s & this.DM, e = o; e < this.t; ++e)
						i[e] = r(this[e], n);
					i.t = this.t;
				} else {
					for (n = this.s & this.DM, e = o; e < t.t; ++e)
						i[e] = r(n, t[e]);
					i.t = t.t;
				}
				(i.s = r(this.s, t.s)), i.clamp();
			}
			function ot(t, r) {
				return t & r;
			}
			function st(t) {
				var r = e();
				return this.bitwiseTo(t, ot, r), r;
			}
			function ut(t, r) {
				return t | r;
			}
			function ht(t) {
				var r = e();
				return this.bitwiseTo(t, ut, r), r;
			}
			function at(t, r) {
				return t ^ r;
			}
			function ft(t) {
				var r = e();
				return this.bitwiseTo(t, at, r), r;
			}
			function ct(t, r) {
				return t & ~r;
			}
			function lt(t) {
				var r = e();
				return this.bitwiseTo(t, ct, r), r;
			}
			function pt() {
				for (var t = e(), r = 0; r < this.t; ++r)
					t[r] = this.DM & ~this[r];
				return (t.t = this.t), (t.s = ~this.s), t;
			}
			function vt(t) {
				var r = e();
				return t < 0 ? this.rShiftTo(-t, r) : this.lShiftTo(t, r), r;
			}
			function yt(t) {
				var r = e();
				return t < 0 ? this.lShiftTo(-t, r) : this.rShiftTo(t, r), r;
			}
			function gt(t) {
				if (0 == t) return -1;
				var r = 0;
				return (
					0 == (65535 & t) && ((t >>= 16), (r += 16)),
					0 == (255 & t) && ((t >>= 8), (r += 8)),
					0 == (15 & t) && ((t >>= 4), (r += 4)),
					0 == (3 & t) && ((t >>= 2), (r += 2)),
					0 == (1 & t) && ++r,
					r
				);
			}
			function dt() {
				for (var t = 0; t < this.t; ++t)
					if (0 != this[t]) return t * this.DB + gt(this[t]);
				return this.s < 0 ? this.t * this.DB : -1;
			}
			function mt(t) {
				for (var r = 0; 0 != t; ) (t &= t - 1), ++r;
				return r;
			}
			function Tt() {
				for (var t = 0, r = this.s & this.DM, i = 0; i < this.t; ++i)
					t += mt(this[i] ^ r);
				return t;
			}
			function bt(t) {
				var r = Math.floor(t / this.DB);
				return r >= this.t
					? 0 != this.s
					: 0 != (this[r] & (1 << t % this.DB));
			}
			function Ft(t, r) {
				var e = i.ONE.shiftLeft(t);
				return this.bitwiseTo(e, r, e), e;
			}
			function wt(t) {
				return this.changeBit(t, ut);
			}
			function Bt(t) {
				return this.changeBit(t, ct);
			}
			function xt(t) {
				return this.changeBit(t, at);
			}
			function St(t, r) {
				for (var i = 0, e = 0, n = Math.min(t.t, this.t); i < n; )
					(e += this[i] + t[i]),
						(r[i++] = e & this.DM),
						(e >>= this.DB);
				if (t.t < this.t) {
					for (e += t.s; i < this.t; )
						(e += this[i]), (r[i++] = e & this.DM), (e >>= this.DB);
					e += this.s;
				} else {
					for (e += this.s; i < t.t; )
						(e += t[i]), (r[i++] = e & this.DM), (e >>= this.DB);
					e += t.s;
				}
				(r.s = e < 0 ? -1 : 0),
					e > 0 ? (r[i++] = e) : e < -1 && (r[i++] = this.DV + e),
					(r.t = i),
					r.clamp();
			}
			function Dt(t) {
				var r = e();
				return this.addTo(t, r), r;
			}
			function It(t) {
				var r = e();
				return this.subTo(t, r), r;
			}
			function Et(t) {
				var r = e();
				return this.multiplyTo(t, r), r;
			}
			function qt() {
				var t = e();
				return this.squareTo(t), t;
			}
			function At(t) {
				var r = e();
				return this.divRemTo(t, r, null), r;
			}
			function Pt(t) {
				var r = e();
				return this.divRemTo(t, null, r), r;
			}
			function Ot(t) {
				var r = e(),
					i = e();
				return this.divRemTo(t, r, i), new Array(r, i);
			}
			function Rt(t) {
				(this[this.t] = this.am(0, t - 1, this, 0, 0, this.t)),
					++this.t,
					this.clamp();
			}
			function Mt(t, r) {
				if (0 != t) {
					for (; this.t <= r; ) this[this.t++] = 0;
					for (this[r] += t; this[r] >= this.DV; )
						(this[r] -= this.DV),
							++r >= this.t && (this[this.t++] = 0),
							++this[r];
				}
			}
			function kt() {}
			function Ct(t) {
				return t;
			}
			function Ht(t, r, i) {
				t.multiplyTo(r, i);
			}
			function Vt(t, r) {
				t.squareTo(r);
			}
			function Nt(t) {
				return this.exp(t, new kt());
			}
			function jt(t, r, i) {
				var e = Math.min(this.t + t.t, r);
				for (i.s = 0, i.t = e; e > 0; ) i[--e] = 0;
				var n;
				for (n = i.t - this.t; e < n; ++e)
					i[e + this.t] = this.am(0, t[e], i, e, 0, this.t);
				for (n = Math.min(t.t, r); e < n; ++e)
					this.am(0, t[e], i, e, 0, r - e);
				i.clamp();
			}
			function Lt(t, r, i) {
				--r;
				var e = (i.t = this.t + t.t - r);
				for (i.s = 0; --e >= 0; ) i[e] = 0;
				for (e = Math.max(r - this.t, 0); e < t.t; ++e)
					i[this.t + e - r] = this.am(
						r - e,
						t[e],
						i,
						0,
						0,
						this.t + e - r
					);
				i.clamp(), i.drShiftTo(1, i);
			}
			function zt(t) {
				(this.r2 = e()),
					(this.q3 = e()),
					i.ONE.dlShiftTo(2 * t.t, this.r2),
					(this.mu = this.r2.divide(t)),
					(this.m = t);
			}
			function Kt(t) {
				if (t.s < 0 || t.t > 2 * this.m.t) return t.mod(this.m);
				if (t.compareTo(this.m) < 0) return t;
				var r = e();
				return t.copyTo(r), this.reduce(r), r;
			}
			function Zt(t) {
				return t;
			}
			function _t(t) {
				for (
					t.drShiftTo(this.m.t - 1, this.r2),
						t.t > this.m.t + 1 && ((t.t = this.m.t + 1), t.clamp()),
						this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
						this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
					t.compareTo(this.r2) < 0;

				)
					t.dAddOffset(1, this.m.t + 1);
				for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
					t.subTo(this.m, t);
			}
			function Ut(t, r) {
				t.squareTo(r), this.reduce(r);
			}
			function Xt(t, r, i) {
				t.multiplyTo(r, i), this.reduce(i);
			}
			function Yt(t, r) {
				var i,
					n,
					o = t.bitLength(),
					s = c(1);
				if (o <= 0) return s;
				(i = o < 18 ? 1 : o < 48 ? 3 : o < 144 ? 4 : o < 768 ? 5 : 6),
					(n = o < 8 ? new q(r) : r.isEven() ? new zt(r) : new C(r));
				var u = new Array(),
					h = 3,
					a = i - 1,
					f = (1 << i) - 1;
				if (((u[1] = n.convert(this)), i > 1)) {
					var l = e();
					for (n.sqrTo(u[1], l); h <= f; )
						(u[h] = e()), n.mulTo(l, u[h - 2], u[h]), (h += 2);
				}
				var p,
					v,
					y = t.t - 1,
					g = !0,
					d = e();
				for (o = m(t[y]) - 1; y >= 0; ) {
					for (
						o >= a
							? (p = (t[y] >> (o - a)) & f)
							: ((p = (t[y] & ((1 << (o + 1)) - 1)) << (a - o)),
							  y > 0 && (p |= t[y - 1] >> (this.DB + o - a))),
							h = i;
						0 == (1 & p);

					)
						(p >>= 1), --h;
					if (((o -= h) < 0 && ((o += this.DB), --y), g))
						u[p].copyTo(s), (g = !1);
					else {
						for (; h > 1; ) n.sqrTo(s, d), n.sqrTo(d, s), (h -= 2);
						h > 0 ? n.sqrTo(s, d) : ((v = s), (s = d), (d = v)),
							n.mulTo(d, u[p], s);
					}
					for (; y >= 0 && 0 == (t[y] & (1 << o)); )
						n.sqrTo(s, d),
							(v = s),
							(s = d),
							(d = v),
							--o < 0 && ((o = this.DB - 1), --y);
				}
				return n.revert(s);
			}
			function Gt(t) {
				var r = this.s < 0 ? this.negate() : this.clone(),
					i = t.s < 0 ? t.negate() : t.clone();
				if (r.compareTo(i) < 0) {
					var e = r;
					(r = i), (i = e);
				}
				var n = r.getLowestSetBit(),
					o = i.getLowestSetBit();
				if (o < 0) return r;
				for (
					n < o && (o = n),
						o > 0 && (r.rShiftTo(o, r), i.rShiftTo(o, i));
					r.signum() > 0;

				)
					(n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r),
						(n = i.getLowestSetBit()) > 0 && i.rShiftTo(n, i),
						r.compareTo(i) >= 0
							? (r.subTo(i, r), r.rShiftTo(1, r))
							: (i.subTo(r, i), i.rShiftTo(1, i));
				return o > 0 && i.lShiftTo(o, i), i;
			}
			function Jt(t) {
				if (t <= 0) return 0;
				var r = this.DV % t,
					i = this.s < 0 ? t - 1 : 0;
				if (this.t > 0)
					if (0 == r) i = this[0] % t;
					else
						for (var e = this.t - 1; e >= 0; --e)
							i = (r * i + this[e]) % t;
				return i;
			}
			function Qt(t) {
				var r = t.isEven();
				if ((this.isEven() && r) || 0 == t.signum()) return i.ZERO;
				for (
					var e = t.clone(),
						n = this.clone(),
						o = c(1),
						s = c(0),
						u = c(0),
						h = c(1);
					0 != e.signum();

				) {
					for (; e.isEven(); )
						e.rShiftTo(1, e),
							r
								? ((o.isEven() && s.isEven()) ||
										(o.addTo(this, o), s.subTo(t, s)),
								  o.rShiftTo(1, o))
								: s.isEven() || s.subTo(t, s),
							s.rShiftTo(1, s);
					for (; n.isEven(); )
						n.rShiftTo(1, n),
							r
								? ((u.isEven() && h.isEven()) ||
										(u.addTo(this, u), h.subTo(t, h)),
								  u.rShiftTo(1, u))
								: h.isEven() || h.subTo(t, h),
							h.rShiftTo(1, h);
					e.compareTo(n) >= 0
						? (e.subTo(n, e), r && o.subTo(u, o), s.subTo(h, s))
						: (n.subTo(e, n), r && u.subTo(o, u), h.subTo(s, h));
				}
				return 0 != n.compareTo(i.ONE)
					? i.ZERO
					: h.compareTo(t) >= 0
					? h.subtract(t)
					: h.signum() < 0
					? (h.addTo(t, h), h.signum() < 0 ? h.add(t) : h)
					: h;
			}
			function Wt(t) {
				var r,
					i = this.abs();
				if (1 == i.t && i[0] <= yr[yr.length - 1]) {
					for (r = 0; r < yr.length; ++r)
						if (i[0] == yr[r]) return !0;
					return !1;
				}
				if (i.isEven()) return !1;
				for (r = 1; r < yr.length; ) {
					for (var e = yr[r], n = r + 1; n < yr.length && e < gr; )
						e *= yr[n++];
					for (e = i.modInt(e); r < n; )
						if (e % yr[r++] == 0) return !1;
				}
				return i.millerRabin(t);
			}
			function $t(t) {
				var r = this.subtract(i.ONE),
					n = r.getLowestSetBit();
				if (n <= 0) return !1;
				var o = r.shiftRight(n);
				(t = (t + 1) >> 1) > yr.length && (t = yr.length);
				for (var s = e(), u = 0; u < t; ++u) {
					s.fromInt(yr[Math.floor(Math.random() * yr.length)]);
					var h = s.modPow(o, this);
					if (0 != h.compareTo(i.ONE) && 0 != h.compareTo(r)) {
						for (var a = 1; a++ < n && 0 != h.compareTo(r); )
							if (
								((h = h.modPowInt(2, this)),
								0 == h.compareTo(i.ONE))
							)
								return !1;
						if (0 != h.compareTo(r)) return !1;
					}
				}
				return !0;
			}
			function tr(t) {
				(mr[Tr++] ^= 255 & t),
					(mr[Tr++] ^= (t >> 8) & 255),
					(mr[Tr++] ^= (t >> 16) & 255),
					(mr[Tr++] ^= (t >> 24) & 255),
					Tr >= Br && (Tr -= Br);
			}
			function rr() {
				tr(new Date().getTime());
			}
			function ir() {
				if (null == dr) {
					for (
						rr(), dr = hr(), dr.init(mr), Tr = 0;
						Tr < mr.length;
						++Tr
					)
						mr[Tr] = 0;
					Tr = 0;
				}
				return dr.next();
			}
			function er(t) {
				var r;
				for (r = 0; r < t.length; ++r) t[r] = ir();
			}
			function nr() {}
			function or() {
				(this.i = 0), (this.j = 0), (this.S = new Array());
			}
			function sr(t) {
				var r, i, e;
				for (r = 0; r < 256; ++r) this.S[r] = r;
				for (i = 0, r = 0; r < 256; ++r)
					(i = (i + this.S[r] + t[r % t.length]) & 255),
						(e = this.S[r]),
						(this.S[r] = this.S[i]),
						(this.S[i] = e);
				(this.i = 0), (this.j = 0);
			}
			function ur() {
				var t;
				return (
					(this.i = (this.i + 1) & 255),
					(this.j = (this.j + this.S[this.i]) & 255),
					(t = this.S[this.i]),
					(this.S[this.i] = this.S[this.j]),
					(this.S[this.j] = t),
					this.S[(t + this.S[this.i]) & 255]
				);
			}
			function hr() {
				return new or();
			}
			var ar,
				fr = "undefined" != typeof navigator;
			fr && "Microsoft Internet Explorer" == navigator.appName
				? ((i.prototype.am = o), (ar = 30))
				: fr && "Netscape" != navigator.appName
				? ((i.prototype.am = n), (ar = 26))
				: ((i.prototype.am = s), (ar = 28)),
				(i.prototype.DB = ar),
				(i.prototype.DM = (1 << ar) - 1),
				(i.prototype.DV = 1 << ar);
			(i.prototype.FV = Math.pow(2, 52)),
				(i.prototype.F1 = 52 - ar),
				(i.prototype.F2 = 2 * ar - 52);
			var cr,
				lr,
				pr = "0123456789abcdefghijklmnopqrstuvwxyz",
				vr = new Array();
			for (cr = "0".charCodeAt(0), lr = 0; lr <= 9; ++lr) vr[cr++] = lr;
			for (cr = "a".charCodeAt(0), lr = 10; lr < 36; ++lr) vr[cr++] = lr;
			for (cr = "A".charCodeAt(0), lr = 10; lr < 36; ++lr) vr[cr++] = lr;
			(q.prototype.convert = A),
				(q.prototype.revert = P),
				(q.prototype.reduce = O),
				(q.prototype.mulTo = R),
				(q.prototype.sqrTo = M),
				(C.prototype.convert = H),
				(C.prototype.revert = V),
				(C.prototype.reduce = N),
				(C.prototype.mulTo = L),
				(C.prototype.sqrTo = j),
				(i.prototype.copyTo = a),
				(i.prototype.fromInt = f),
				(i.prototype.fromString = l),
				(i.prototype.clamp = p),
				(i.prototype.dlShiftTo = b),
				(i.prototype.drShiftTo = F),
				(i.prototype.lShiftTo = w),
				(i.prototype.rShiftTo = B),
				(i.prototype.subTo = x),
				(i.prototype.multiplyTo = S),
				(i.prototype.squareTo = D),
				(i.prototype.divRemTo = I),
				(i.prototype.invDigit = k),
				(i.prototype.isEven = z),
				(i.prototype.exp = K),
				(i.prototype.toString = v),
				(i.prototype.negate = y),
				(i.prototype.abs = g),
				(i.prototype.compareTo = d),
				(i.prototype.bitLength = T),
				(i.prototype.mod = E),
				(i.prototype.modPowInt = Z),
				(i.ZERO = c(0)),
				(i.ONE = c(1)),
				(kt.prototype.convert = Ct),
				(kt.prototype.revert = Ct),
				(kt.prototype.mulTo = Ht),
				(kt.prototype.sqrTo = Vt),
				(zt.prototype.convert = Kt),
				(zt.prototype.revert = Zt),
				(zt.prototype.reduce = _t),
				(zt.prototype.mulTo = Xt),
				(zt.prototype.sqrTo = Ut);
			var yr = [
					2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53,
					59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
					127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181,
					191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251,
					257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
					331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397,
					401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
					467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557,
					563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619,
					631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701,
					709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787,
					797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863,
					877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953,
					967, 971, 977, 983, 991, 997,
				],
				gr = (1 << 26) / yr[yr.length - 1];
			(i.prototype.chunkSize = G),
				(i.prototype.toRadix = Q),
				(i.prototype.fromRadix = W),
				(i.prototype.fromNumber = $),
				(i.prototype.bitwiseTo = nt),
				(i.prototype.changeBit = Ft),
				(i.prototype.addTo = St),
				(i.prototype.dMultiply = Rt),
				(i.prototype.dAddOffset = Mt),
				(i.prototype.multiplyLowerTo = jt),
				(i.prototype.multiplyUpperTo = Lt),
				(i.prototype.modInt = Jt),
				(i.prototype.millerRabin = $t),
				(i.prototype.clone = _),
				(i.prototype.intValue = U),
				(i.prototype.byteValue = X),
				(i.prototype.shortValue = Y),
				(i.prototype.signum = J),
				(i.prototype.toByteArray = tt),
				(i.prototype.equals = rt),
				(i.prototype.min = it),
				(i.prototype.max = et),
				(i.prototype.and = st),
				(i.prototype.or = ht),
				(i.prototype.xor = ft),
				(i.prototype.andNot = lt),
				(i.prototype.not = pt),
				(i.prototype.shiftLeft = vt),
				(i.prototype.shiftRight = yt),
				(i.prototype.getLowestSetBit = dt),
				(i.prototype.bitCount = Tt),
				(i.prototype.testBit = bt),
				(i.prototype.setBit = wt),
				(i.prototype.clearBit = Bt),
				(i.prototype.flipBit = xt),
				(i.prototype.add = Dt),
				(i.prototype.subtract = It),
				(i.prototype.multiply = Et),
				(i.prototype.divide = At),
				(i.prototype.remainder = Pt),
				(i.prototype.divideAndRemainder = Ot),
				(i.prototype.modPow = Yt),
				(i.prototype.modInverse = Qt),
				(i.prototype.pow = Nt),
				(i.prototype.gcd = Gt),
				(i.prototype.isProbablePrime = Wt),
				(i.prototype.square = qt),
				(i.prototype.Barrett = zt);
			var dr, mr, Tr;
			if (null == mr) {
				(mr = new Array()), (Tr = 0);
				var br;
				if ("undefined" != typeof window && window.crypto)
					if (window.crypto.getRandomValues) {
						var Fr = new Uint8Array(32);
						for (
							window.crypto.getRandomValues(Fr), br = 0;
							br < 32;
							++br
						)
							mr[Tr++] = Fr[br];
					} else if (
						"Netscape" == navigator.appName &&
						navigator.appVersion < "5"
					) {
						var wr = window.crypto.random(32);
						for (br = 0; br < wr.length; ++br)
							mr[Tr++] = 255 & wr.charCodeAt(br);
					}
				for (; Tr < Br; )
					(br = Math.floor(65536 * Math.random())),
						(mr[Tr++] = br >>> 8),
						(mr[Tr++] = 255 & br);
				(Tr = 0), rr();
			}
			(nr.prototype.nextBytes = er),
				(or.prototype.init = sr),
				(or.prototype.next = ur);
			var Br = 256;
			r = t.exports = { default: i, BigInteger: i, SecureRandom: nr };
		}).call(void 0);
	},
	function (t, r, i) {
		"use strict";
		function e(t) {
			if (Array.isArray(t)) {
				for (var r = 0, i = Array(t.length); r < t.length; r++)
					i[r] = t[r];
				return i;
			}
			return Array.from(t);
		}
		function n(t, r) {
			var i = 31 & r;
			return (t << i) | (t >>> (32 - i));
		}
		function o(t, r) {
			for (var i = [], e = t.length - 1; e >= 0; e--)
				i[e] = 255 & (t[e] ^ r[e]);
			return i;
		}
		function s(t) {
			return t ^ n(t, 9) ^ n(t, 17);
		}
		function u(t) {
			return t ^ n(t, 15) ^ n(t, 23);
		}
		function h(t) {
			var r = 8 * t.length,
				i = r % 512;
			i = i >= 448 ? 512 - (i % 448) - 1 : 448 - i - 1;
			for (
				var o = new Array((i - 7) / 8),
					h = new Array(8),
					a = 0,
					l = o.length;
				a < l;
				a++
			)
				o[a] = 0;
			for (var p = 0, v = h.length; p < v; p++) h[p] = 0;
			r = r.toString(2);
			for (var y = 7; y >= 0; y--)
				if (r.length > 8) {
					var g = r.length - 8;
					(h[y] = parseInt(r.substr(g), 2)), (r = r.substr(0, g));
				} else r.length > 0 && ((h[y] = parseInt(r, 2)), (r = ""));
			for (
				var d = new Uint8Array([].concat(e(t), [128], o, h)),
					m = new DataView(d.buffer, 0),
					T = d.length / 64,
					b = new Uint32Array([
						1937774191, 1226093241, 388252375, 3666478592,
						2842636476, 372324522, 3817729613, 2969243214,
					]),
					F = 0;
				F < T;
				F++
			) {
				fillArray(f, 0), fillArray(c, 0);
				for (var w = 16 * F, B = 0; B < 16; B++)
					f[B] = m.getUint32(4 * (w + B), !1);
				for (var x = 16; x < 68; x++)
					f[x] =
						u(f[x - 16] ^ f[x - 9] ^ n(f[x - 3], 15)) ^
						n(f[x - 13], 7) ^
						f[x - 6];
				for (var S = 0; S < 64; S++) c[S] = f[S] ^ f[S + 4];
				for (
					var D = b[0],
						I = b[1],
						E = b[2],
						q = b[3],
						A = b[4],
						P = b[5],
						O = b[6],
						R = b[7],
						M = void 0,
						k = void 0,
						C = void 0,
						H = void 0,
						V = void 0,
						N = 0;
					N < 64;
					N++
				)
					(V = N >= 0 && N <= 15 ? 2043430169 : 2055708042),
						(M = n(n(D, 12) + A + n(V, N), 7)),
						(k = M ^ n(D, 12)),
						(C =
							(N >= 0 && N <= 15
								? D ^ I ^ E
								: (D & I) | (D & E) | (I & E)) +
							q +
							k +
							c[N]),
						(H =
							(N >= 0 && N <= 15
								? A ^ P ^ O
								: (A & P) | (~A & O)) +
							R +
							M +
							f[N]),
						(q = E),
						(E = n(I, 9)),
						(I = D),
						(D = C),
						(R = O),
						(O = n(P, 19)),
						(P = A),
						(A = s(H));
				(b[0] ^= D),
					(b[1] ^= I),
					(b[2] ^= E),
					(b[3] ^= q),
					(b[4] ^= A),
					(b[5] ^= P),
					(b[6] ^= O),
					(b[7] ^= R);
			}
			for (var j = [], L = 0, z = b.length; L < z; L++) {
				var K = b[L];
				j.push(
					(4278190080 & K) >>> 24,
					(16711680 & K) >>> 16,
					(65280 & K) >>> 8,
					255 & K
				);
			}
			return j;
		}
		function a(t, r) {
			for (r.length > l && (r = h(r)); r.length < l; ) r.push(0);
			var i = o(r, p),
				n = o(r, v),
				s = h([].concat(e(i), e(t)));
			return h([].concat(e(n), e(s)));
		}
		for (
			var f = new Uint32Array(68),
				c = new Uint32Array(64),
				l = 64,
				p = new Uint8Array(l),
				v = new Uint8Array(l),
				y = 0;
			y < l;
			y++
		)
			(p[y] = 54), (v[y] = 92);
		t.exports = { sm3: h, hmac: a };
	},
	function (t, r, i) {
		"use strict";
		function e(t, r) {
			var i = t;
			"string" != typeof t && (i = JSON.stringify(t));
			return "04" + s.default.sm2.doEncrypt(i, r, 1);
		}
		function n(t, r) {
			var i = t;
			"string" != typeof t && (i = JSON.stringify(t));
			var e = s.default.sm2,
				n = i.substr(2);
			return e.doDecrypt(n, r, 1);
		}
		Object.defineProperty(r, "__esModule", { value: !0 }),
			(r.doEncryptStr = e),
			(r.doDecryptStr = n);
		var o = i(3),
			s = (function (t) {
				return t && t.__esModule ? t : { default: t };
			})(o);
	},
	function (t, r, i) {
		"use strict";
		t.exports = { sm2: i(4), sm3: i(8), sm4: i(9) };
	},
	function (t, r, i) {
		"use strict";
		function e(t) {
			if (Array.isArray(t)) {
				for (var r = 0, i = Array(t.length); r < t.length; r++)
					i[r] = t[r];
				return i;
			}
			return Array.from(t);
		}
		function n(t, r) {
			var i =
				arguments.length > 2 && void 0 !== arguments[2]
					? arguments[2]
					: 1;
			(t =
				"string" == typeof t
					? g.hexToArray(g.utf8ToHex(t))
					: Array.prototype.slice.call(t)),
				(r = g.getGlobalCurve().decodePointHex(r));
			var n = g.generateKeyPairHex(),
				o = new l(n.privateKey, 16),
				s = n.publicKey;
			s.length > 128 && (s = s.substr(s.length - 128));
			var u = r.multiply(o),
				h = g.hexToArray(
					g.leftPad(u.getX().toBigInteger().toRadix(16), 64)
				),
				a = g.hexToArray(
					g.leftPad(u.getY().toBigInteger().toRadix(16), 64)
				),
				f = g.arrayToHex(d([].concat(h, t, a))),
				c = 1,
				p = 0,
				v = [],
				y = [].concat(h, a),
				m = function () {
					(v = d(
						[].concat(e(y), [
							(c >> 24) & 255,
							(c >> 16) & 255,
							(c >> 8) & 255,
							255 & c,
						])
					)),
						c++,
						(p = 0);
				};
			m();
			for (var T = 0, b = t.length; T < b; T++)
				p === v.length && m(), (t[T] ^= 255 & v[p++]);
			var F = g.arrayToHex(t);
			return i === w ? s + F + f : s + f + F;
		}
		function o(t, r) {
			var i =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: 1,
				n =
					arguments.length > 3 && void 0 !== arguments[3]
						? arguments[3]
						: {},
				o = n.output,
				s = void 0 === o ? "string" : o;
			r = new l(r, 16);
			var u = t.substr(128, 64),
				h = t.substr(192);
			i === w &&
				((u = t.substr(t.length - 64)),
				(h = t.substr(128, t.length - 128 - 64)));
			var a = g.hexToArray(h),
				f = g.getGlobalCurve().decodePointHex("04" + t.substr(0, 128)),
				c = f.multiply(r),
				p = g.hexToArray(
					g.leftPad(c.getX().toBigInteger().toRadix(16), 64)
				),
				v = g.hexToArray(
					g.leftPad(c.getY().toBigInteger().toRadix(16), 64)
				),
				y = 1,
				m = 0,
				T = [],
				b = [].concat(p, v),
				F = function () {
					(T = d(
						[].concat(e(b), [
							(y >> 24) & 255,
							(y >> 16) & 255,
							(y >> 8) & 255,
							255 & y,
						])
					)),
						y++,
						(m = 0);
				};
			F();
			for (var B = 0, x = a.length; B < x; B++)
				m === T.length && F(), (a[B] ^= 255 & T[m++]);
			return g.arrayToHex(d([].concat(p, a, v))) === u.toLowerCase()
				? "array" === s
					? a
					: g.arrayToUtf8(a)
				: "array" === s
				? []
				: "";
		}
		function s(t, r) {
			var i =
					arguments.length > 2 && void 0 !== arguments[2]
						? arguments[2]
						: {},
				e = i.pointPool,
				n = i.der,
				o = i.hash,
				s = i.publicKey,
				u = i.userId,
				c = "string" == typeof t ? g.utf8ToHex(t) : g.arrayToHex(t);
			o && ((s = s || a(r)), (c = h(c, s, u)));
			var p = new l(r, 16),
				y = new l(c, 16),
				d = null,
				m = null,
				T = null;
			do {
				do {
					var b = void 0;
					(b = e && e.length ? e.pop() : f()),
						(d = b.k),
						(m = y.add(b.x1).mod(F));
				} while (m.equals(l.ZERO) || m.add(d).equals(F));
				T = p
					.add(l.ONE)
					.modInverse(F)
					.multiply(d.subtract(m.multiply(p)))
					.mod(F);
			} while (T.equals(l.ZERO));
			return n
				? v(m, T)
				: g.leftPad(m.toString(16), 64) + g.leftPad(T.toString(16), 64);
		}
		function u(t, r, i) {
			var e =
					arguments.length > 3 && void 0 !== arguments[3]
						? arguments[3]
						: {},
				n = e.der,
				o = e.hash,
				s = e.userId,
				u = "string" == typeof t ? g.utf8ToHex(t) : g.arrayToHex(t);
			o && (u = h(u, i, s));
			var a = void 0,
				f = void 0;
			if (n) {
				var c = y(r);
				(a = c.r), (f = c.s);
			} else
				(a = new l(r.substring(0, 64), 16)),
					(f = new l(r.substring(64), 16));
			var p = b.decodePointHex(i),
				v = new l(u, 16),
				d = a.add(f).mod(F);
			if (d.equals(l.ZERO)) return !1;
			var m = T.multiply(f).add(p.multiply(d)),
				w = v.add(m.getX().toBigInteger()).mod(F);
			return a.equals(w);
		}
		function h(t, r) {
			var i =
				arguments.length > 2 && void 0 !== arguments[2]
					? arguments[2]
					: "1234567812345678";
			i = g.utf8ToHex(i);
			var e = g.leftPad(T.curve.a.toBigInteger().toRadix(16), 64),
				n = g.leftPad(T.curve.b.toBigInteger().toRadix(16), 64),
				o = g.leftPad(T.getX().toBigInteger().toRadix(16), 64),
				s = g.leftPad(T.getY().toBigInteger().toRadix(16), 64),
				u = void 0,
				h = void 0;
			if (128 === r.length) (u = r.substr(0, 64)), (h = r.substr(64, 64));
			else {
				var a = T.curve.decodePointHex(r);
				(u = g.leftPad(a.getX().toBigInteger().toRadix(16), 64)),
					(h = g.leftPad(a.getY().toBigInteger().toRadix(16), 64));
			}
			var f = g.hexToArray(i + e + n + o + s + u + h),
				c = 4 * i.length;
			f.unshift(255 & c), f.unshift((c >> 8) & 255);
			var l = d(f);
			return g.arrayToHex(d(l.concat(g.hexToArray(t))));
		}
		function a(t) {
			var r = T.multiply(new l(t, 16));
			return (
				"04" +
				g.leftPad(r.getX().toBigInteger().toString(16), 64) +
				g.leftPad(r.getY().toBigInteger().toString(16), 64)
			);
		}
		function f() {
			var t = g.generateKeyPairHex(),
				r = b.decodePointHex(t.publicKey);
			return (
				(t.k = new l(t.privateKey, 16)),
				(t.x1 = r.getX().toBigInteger()),
				t
			);
		}
		var c = i(0),
			l = c.BigInteger,
			p = i(5),
			v = p.encodeDer,
			y = p.decodeDer,
			g = i(6),
			d = i(1).sm3,
			m = g.generateEcparam(),
			T = m.G,
			b = m.curve,
			F = m.n,
			w = 0;
		t.exports = {
			generateKeyPairHex: g.generateKeyPairHex,
			compressPublicKeyHex: g.compressPublicKeyHex,
			comparePublicKeyHex: g.comparePublicKeyHex,
			doEncrypt: n,
			doDecrypt: o,
			doSignature: s,
			doVerifySignature: u,
			getPoint: f,
			verifyPublicKey: g.verifyPublicKey,
		};
	},
	function (t, r, i) {
		"use strict";
		function e(t, r) {
			if (!t)
				throw new ReferenceError(
					"this hasn't been initialised - super() hasn't been called"
				);
			return !r ||
				("object" !== (void 0 === r ? "undefined" : f(r)) &&
					"function" != typeof r)
				? t
				: r;
		}
		function n(t, r) {
			if ("function" != typeof r && null !== r)
				throw new TypeError(
					"Super expression must either be null or a function, not " +
						(void 0 === r ? "undefined" : f(r))
				);
			(t.prototype = Object.create(r && r.prototype, {
				constructor: {
					value: t,
					enumerable: !1,
					writable: !0,
					configurable: !0,
				},
			})),
				r &&
					(Object.setPrototypeOf
						? Object.setPrototypeOf(t, r)
						: (t.__proto__ = r));
		}
		function o(t, r) {
			if (!(t instanceof r))
				throw new TypeError("Cannot call a class as a function");
		}
		function s(t) {
			var r = t.toString(16);
			if ("-" !== r[0])
				r.length % 2 == 1
					? (r = "0" + r)
					: r.match(/^[0-7]/) || (r = "00" + r);
			else {
				r = r.substr(1);
				var i = r.length;
				i % 2 == 1 ? (i += 1) : r.match(/^[0-7]/) || (i += 2);
				for (var e = "", n = 0; n < i; n++) e += "f";
				(e = new p(e, 16)),
					(r = e.xor(t).add(p.ONE)),
					(r = r.toString(16).replace(/^-/, ""));
			}
			return r;
		}
		function u(t, r) {
			return +t[r + 2] < 8 ? 1 : 128 & +t.substr(r + 2, 2);
		}
		function h(t, r) {
			var i = u(t, r),
				e = t.substr(r + 2, 2 * i);
			return e
				? (+e[0] < 8 ? new p(e, 16) : new p(e.substr(2), 16)).intValue()
				: -1;
		}
		function a(t, r) {
			return r + 2 * (u(t, r) + 1);
		}
		var f =
				"function" == typeof Symbol &&
				"symbol" == typeof Symbol.iterator
					? function (t) {
							return typeof t;
					  }
					: function (t) {
							return t &&
								"function" == typeof Symbol &&
								t.constructor === Symbol &&
								t !== Symbol.prototype
								? "symbol"
								: typeof t;
					  },
			c = (function () {
				function t(t, r) {
					for (var i = 0; i < r.length; i++) {
						var e = r[i];
						(e.enumerable = e.enumerable || !1),
							(e.configurable = !0),
							"value" in e && (e.writable = !0),
							Object.defineProperty(t, e.key, e);
					}
				}
				return function (r, i, e) {
					return i && t(r.prototype, i), e && t(r, e), r;
				};
			})(),
			l = i(0),
			p = l.BigInteger,
			v = (function () {
				function t() {
					o(this, t),
						(this.tlv = null),
						(this.t = "00"),
						(this.l = "00"),
						(this.v = "");
				}
				return (
					c(t, [
						{
							key: "getEncodedHex",
							value: function () {
								return (
									this.tlv ||
										((this.v = this.getValue()),
										(this.l = this.getLength()),
										(this.tlv = this.t + this.l + this.v)),
									this.tlv
								);
							},
						},
						{
							key: "getLength",
							value: function () {
								var t = this.v.length / 2,
									r = t.toString(16);
								return (
									r.length % 2 == 1 && (r = "0" + r),
									t < 128
										? r
										: (128 + r.length / 2).toString(16) + r
								);
							},
						},
						{
							key: "getValue",
							value: function () {
								return "";
							},
						},
					]),
					t
				);
			})(),
			y = (function (t) {
				function r(t) {
					o(this, r);
					var i = e(
						this,
						(r.__proto__ || Object.getPrototypeOf(r)).call(this)
					);
					return (i.t = "02"), t && (i.v = s(t)), i;
				}
				return (
					n(r, t),
					c(r, [
						{
							key: "getValue",
							value: function () {
								return this.v;
							},
						},
					]),
					r
				);
			})(v),
			g = (function (t) {
				function r(t) {
					o(this, r);
					var i = e(
						this,
						(r.__proto__ || Object.getPrototypeOf(r)).call(this)
					);
					return (i.t = "30"), (i.asn1Array = t), i;
				}
				return (
					n(r, t),
					c(r, [
						{
							key: "getValue",
							value: function () {
								return (
									(this.v = this.asn1Array
										.map(function (t) {
											return t.getEncodedHex();
										})
										.join("")),
									this.v
								);
							},
						},
					]),
					r
				);
			})(v);
		t.exports = {
			encodeDer: function (t, r) {
				var i = new y(t),
					e = new y(r);
				return new g([i, e]).getEncodedHex();
			},
			decodeDer: function (t) {
				var r = a(t, 0),
					i = a(t, r),
					e = h(t, r),
					n = t.substr(i, 2 * e),
					o = i + n.length,
					s = a(t, o),
					u = h(t, o),
					f = t.substr(s, 2 * u);
				return { r: new p(n, 16), s: new p(f, 16) };
			},
		};
	},
	function (t, r, i) {
		"use strict";
		function e() {
			return F;
		}
		function n() {
			var t = new y(
					"FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFF",
					16
				),
				r = new y(
					"FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF00000000FFFFFFFFFFFFFFFC",
					16
				),
				i = new y(
					"28E9FA9E9D9F5E344D5A9E4BCF6509A7F39789F515AB8F92DDBCBD414D940E93",
					16
				),
				e = new m(t, r, i);
			return {
				curve: e,
				G: e.decodePointHex(
					"0432C4AE2C1F1981195F9904466A39C9948FE30BBFF2660BE1715A4589334C74C7BC3736A2F4F6779C59BDCEE36B692153D0A9877CC62A474002DF32E52139F0A0"
				),
				n: new y(
					"FFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFF7203DF6B21C6052B53BBF40939D54123",
					16
				),
			};
		}
		function o(t, r, i) {
			var e = t ? new y(t, r, i) : new y(B.bitLength(), T),
				n = e.mod(B.subtract(y.ONE)).add(y.ONE),
				o = h(n.toString(16), 64),
				s = w.multiply(n);
			return {
				privateKey: o,
				publicKey:
					"04" +
					h(s.getX().toBigInteger().toString(16), 64) +
					h(s.getY().toBigInteger().toString(16), 64),
			};
		}
		function s(t) {
			if (130 !== t.length)
				throw new Error("Invalid public key to compress");
			var r = (t.length - 2) / 2,
				i = t.substr(2, r),
				e = new y(t.substr(r + 2, r), 16),
				n = "03";
			return e.mod(new y("2")).equals(y.ZERO) && (n = "02"), n + i;
		}
		function u(t) {
			t = unescape(encodeURIComponent(t));
			for (var r = t.length, i = [], e = 0; e < r; e++)
				i[e >>> 2] |= (255 & t.charCodeAt(e)) << (24 - (e % 4) * 8);
			for (var n = [], o = 0; o < r; o++) {
				var s = (i[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
				n.push((s >>> 4).toString(16)), n.push((15 & s).toString(16));
			}
			return n.join("");
		}
		function h(t, r) {
			return t.length >= r
				? t
				: new Array(r - t.length + 1).join("0") + t;
		}
		function a(t) {
			return t
				.map(function (t) {
					return (t = t.toString(16)), 1 === t.length ? "0" + t : t;
				})
				.join("");
		}
		function f(t) {
			for (var r = [], i = 0, e = 0; e < 2 * t.length; e += 2)
				(r[e >>> 3] |= parseInt(t[i], 10) << (24 - (e % 8) * 4)), i++;
			try {
				for (var n = [], o = 0; o < t.length; o++) {
					var s = (r[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
					n.push(String.fromCharCode(s));
				}
				return decodeURIComponent(escape(n.join("")));
			} catch (t) {
				throw new Error("Malformed UTF-8 data");
			}
		}
		function c(t) {
			var r = [],
				i = t.length;
			i % 2 != 0 && (t = h(t, i + 1)), (i = t.length);
			for (var e = 0; e < i; e += 2) r.push(parseInt(t.substr(e, 2), 16));
			return r;
		}
		function l(t) {
			var r = F.decodePointHex(t);
			if (!r) return !1;
			var i = r.getX();
			return r
				.getY()
				.square()
				.equals(i.multiply(i.square()).add(i.multiply(F.a)).add(F.b));
		}
		function p(t, r) {
			var i = F.decodePointHex(t);
			if (!i) return !1;
			var e = F.decodePointHex(r);
			return !!e && i.equals(e);
		}
		var v = i(0),
			y = v.BigInteger,
			g = v.SecureRandom,
			d = i(7),
			m = d.ECCurveFp,
			T = new g(),
			b = n(),
			F = b.curve,
			w = b.G,
			B = b.n;
		t.exports = {
			getGlobalCurve: e,
			generateEcparam: n,
			generateKeyPairHex: o,
			compressPublicKeyHex: s,
			utf8ToHex: u,
			leftPad: h,
			arrayToHex: a,
			arrayToUtf8: f,
			hexToArray: c,
			verifyPublicKey: l,
			comparePublicKeyHex: p,
		};
	},
	function (t, r, i) {
		"use strict";
		function e(t, r) {
			if (!(t instanceof r))
				throw new TypeError("Cannot call a class as a function");
		}
		var n = (function () {
				function t(t, r) {
					for (var i = 0; i < r.length; i++) {
						var e = r[i];
						(e.enumerable = e.enumerable || !1),
							(e.configurable = !0),
							"value" in e && (e.writable = !0),
							Object.defineProperty(t, e.key, e);
					}
				}
				return function (r, i, e) {
					return i && t(r.prototype, i), e && t(r, e), r;
				};
			})(),
			o = i(0),
			s = o.BigInteger,
			u = new s("2"),
			h = new s("3"),
			a = (function () {
				function t(r, i) {
					e(this, t), (this.x = i), (this.q = r);
				}
				return (
					n(t, [
						{
							key: "equals",
							value: function (t) {
								return (
									t === this ||
									(this.q.equals(t.q) && this.x.equals(t.x))
								);
							},
						},
						{
							key: "toBigInteger",
							value: function () {
								return this.x;
							},
						},
						{
							key: "negate",
							value: function () {
								return new t(
									this.q,
									this.x.negate().mod(this.q)
								);
							},
						},
						{
							key: "add",
							value: function (r) {
								return new t(
									this.q,
									this.x.add(r.toBigInteger()).mod(this.q)
								);
							},
						},
						{
							key: "subtract",
							value: function (r) {
								return new t(
									this.q,
									this.x
										.subtract(r.toBigInteger())
										.mod(this.q)
								);
							},
						},
						{
							key: "multiply",
							value: function (r) {
								return new t(
									this.q,
									this.x
										.multiply(r.toBigInteger())
										.mod(this.q)
								);
							},
						},
						{
							key: "divide",
							value: function (r) {
								return new t(
									this.q,
									this.x
										.multiply(
											r.toBigInteger().modInverse(this.q)
										)
										.mod(this.q)
								);
							},
						},
						{
							key: "square",
							value: function () {
								return new t(
									this.q,
									this.x.square().mod(this.q)
								);
							},
						},
					]),
					t
				);
			})(),
			f = (function () {
				function t(r, i, n, o) {
					e(this, t),
						(this.curve = r),
						(this.x = i),
						(this.y = n),
						(this.z = null == o ? s.ONE : o),
						(this.zinv = null);
				}
				return (
					n(t, [
						{
							key: "getX",
							value: function () {
								return (
									null === this.zinv &&
										(this.zinv = this.z.modInverse(
											this.curve.q
										)),
									this.curve.fromBigInteger(
										this.x
											.toBigInteger()
											.multiply(this.zinv)
											.mod(this.curve.q)
									)
								);
							},
						},
						{
							key: "getY",
							value: function () {
								return (
									null === this.zinv &&
										(this.zinv = this.z.modInverse(
											this.curve.q
										)),
									this.curve.fromBigInteger(
										this.y
											.toBigInteger()
											.multiply(this.zinv)
											.mod(this.curve.q)
									)
								);
							},
						},
						{
							key: "equals",
							value: function (t) {
								return (
									t === this ||
									(this.isInfinity()
										? t.isInfinity()
										: t.isInfinity()
										? this.isInfinity()
										: !!t.y
												.toBigInteger()
												.multiply(this.z)
												.subtract(
													this.y
														.toBigInteger()
														.multiply(t.z)
												)
												.mod(this.curve.q)
												.equals(s.ZERO) &&
										  t.x
												.toBigInteger()
												.multiply(this.z)
												.subtract(
													this.x
														.toBigInteger()
														.multiply(t.z)
												)
												.mod(this.curve.q)
												.equals(s.ZERO))
								);
							},
						},
						{
							key: "isInfinity",
							value: function () {
								return (
									(null === this.x && null === this.y) ||
									(this.z.equals(s.ZERO) &&
										!this.y.toBigInteger().equals(s.ZERO))
								);
							},
						},
						{
							key: "negate",
							value: function () {
								return new t(
									this.curve,
									this.x,
									this.y.negate(),
									this.z
								);
							},
						},
						{
							key: "add",
							value: function (r) {
								if (this.isInfinity()) return r;
								if (r.isInfinity()) return this;
								var i = this.x.toBigInteger(),
									e = this.y.toBigInteger(),
									n = this.z,
									o = r.x.toBigInteger(),
									u = r.y.toBigInteger(),
									h = r.z,
									a = this.curve.q,
									f = i.multiply(h).mod(a),
									c = o.multiply(n).mod(a),
									l = f.subtract(c),
									p = e.multiply(h).mod(a),
									v = u.multiply(n).mod(a),
									y = p.subtract(v);
								if (s.ZERO.equals(l))
									return s.ZERO.equals(y)
										? this.twice()
										: this.curve.infinity;
								var g = f.add(c),
									d = n.multiply(h).mod(a),
									m = l.square().mod(a),
									T = l.multiply(m).mod(a),
									b = d
										.multiply(y.square())
										.subtract(g.multiply(m))
										.mod(a),
									F = l.multiply(b).mod(a),
									w = y
										.multiply(m.multiply(f).subtract(b))
										.subtract(p.multiply(T))
										.mod(a),
									B = T.multiply(d).mod(a);
								return new t(
									this.curve,
									this.curve.fromBigInteger(F),
									this.curve.fromBigInteger(w),
									B
								);
							},
						},
						{
							key: "twice",
							value: function () {
								if (this.isInfinity()) return this;
								if (!this.y.toBigInteger().signum())
									return this.curve.infinity;
								var r = this.x.toBigInteger(),
									i = this.y.toBigInteger(),
									e = this.z,
									n = this.curve.q,
									o = this.curve.a.toBigInteger(),
									s = r
										.square()
										.multiply(h)
										.add(o.multiply(e.square()))
										.mod(n),
									u = i.shiftLeft(1).multiply(e).mod(n),
									a = i.square().mod(n),
									f = a.multiply(r).multiply(e).mod(n),
									c = u.square().mod(n),
									l = s
										.square()
										.subtract(f.shiftLeft(3))
										.mod(n),
									p = u.multiply(l).mod(n),
									v = s
										.multiply(f.shiftLeft(2).subtract(l))
										.subtract(c.shiftLeft(1).multiply(a))
										.mod(n),
									y = u.multiply(c).mod(n);
								return new t(
									this.curve,
									this.curve.fromBigInteger(p),
									this.curve.fromBigInteger(v),
									y
								);
							},
						},
						{
							key: "multiply",
							value: function (t) {
								if (this.isInfinity()) return this;
								if (!t.signum()) return this.curve.infinity;
								for (
									var r = t.multiply(h),
										i = this.negate(),
										e = this,
										n = r.bitLength() - 2;
									n > 0;
									n--
								) {
									e = e.twice();
									var o = r.testBit(n);
									o !== t.testBit(n) &&
										(e = e.add(o ? this : i));
								}
								return e;
							},
						},
					]),
					t
				);
			})(),
			c = (function () {
				function t(r, i, n) {
					e(this, t),
						(this.q = r),
						(this.a = this.fromBigInteger(i)),
						(this.b = this.fromBigInteger(n)),
						(this.infinity = new f(this, null, null));
				}
				return (
					n(t, [
						{
							key: "equals",
							value: function (t) {
								return (
									t === this ||
									(this.q.equals(t.q) &&
										this.a.equals(t.a) &&
										this.b.equals(t.b))
								);
							},
						},
						{
							key: "fromBigInteger",
							value: function (t) {
								return new a(this.q, t);
							},
						},
						{
							key: "decodePointHex",
							value: function (t) {
								switch (parseInt(t.substr(0, 2), 16)) {
									case 0:
										return this.infinity;
									case 2:
									case 3:
										var r = this.fromBigInteger(
												new s(t.substr(2), 16)
											),
											i = this.fromBigInteger(
												r
													.multiply(r.square())
													.add(r.multiply(this.a))
													.add(this.b)
													.toBigInteger()
													.modPow(
														this.q
															.divide(new s("4"))
															.add(s.ONE),
														this.q
													)
											);
										return (
											i
												.toBigInteger()
												.mod(u)
												.equals(
													new s(
														t.substr(0, 2),
														16
													).subtract(u)
												) || (i = i.negate()),
											new f(this, r, i)
										);
									case 4:
									case 6:
									case 7:
										var e = (t.length - 2) / 2,
											n = t.substr(2, e),
											o = t.substr(e + 2, e);
										return new f(
											this,
											this.fromBigInteger(new s(n, 16)),
											this.fromBigInteger(new s(o, 16))
										);
									default:
										return null;
								}
							},
						},
					]),
					t
				);
			})();
		t.exports = { ECPointFp: f, ECCurveFp: c };
	},
	function (t, r, i) {
		"use strict";
		function e(t, r) {
			return t.length >= r
				? t
				: new Array(r - t.length + 1).join("0") + t;
		}
		function n(t) {
			return t
				.map(function (t) {
					return (t = t.toString(16)), 1 === t.length ? "0" + t : t;
				})
				.join("");
		}
		function o(t) {
			var r = [],
				i = t.length;
			i % 2 != 0 && (t = e(t, i + 1)), (i = t.length);
			for (var n = 0; n < i; n += 2) r.push(parseInt(t.substr(n, 2), 16));
			return r;
		}
		function s(t) {
			for (var r = [], i = 0, e = t.length; i < e; i++) {
				var n = t.codePointAt(i);
				if (n <= 127) r.push(n);
				else if (n <= 2047)
					r.push(192 | (n >>> 6)), r.push(128 | (63 & n));
				else if (n <= 55295 || (n >= 57344 && n <= 65535))
					r.push(224 | (n >>> 12)),
						r.push(128 | ((n >>> 6) & 63)),
						r.push(128 | (63 & n));
				else {
					if (!(n >= 65536 && n <= 1114111))
						throw (r.push(n), new Error("input is not supported"));
					i++,
						r.push(240 | ((n >>> 18) & 28)),
						r.push(128 | ((n >>> 12) & 63)),
						r.push(128 | ((n >>> 6) & 63)),
						r.push(128 | (63 & n));
				}
			}
			return r;
		}
		var u = i(1),
			h = u.sm3,
			a = u.hmac;
		t.exports = function (t, r) {
			if (
				((t =
					"string" == typeof t
						? s(t)
						: Array.prototype.slice.call(t)),
				r)
			) {
				if ("hmac" !== (r.mode || "hmac"))
					throw new Error("invalid mode");
				var i = r.key;
				if (!i) throw new Error("invalid key");
				return (
					(i =
						"string" == typeof i
							? o(i)
							: Array.prototype.slice.call(i)),
					n(a(t, i))
				);
			}
			return n(h(t));
		};
	},
	function (t, r, i) {
		"use strict";
		function e(t) {
			if (Array.isArray(t)) {
				for (var r = 0, i = Array(t.length); r < t.length; r++)
					i[r] = t[r];
				return i;
			}
			return Array.from(t);
		}
		function n(t) {
			for (var r = [], i = 0, e = t.length; i < e; i += 2)
				r.push(parseInt(t.substr(i, 2), 16));
			return r;
		}
		function o(t) {
			return t
				.map(function (t) {
					return (t = t.toString(16)), 1 === t.length ? "0" + t : t;
				})
				.join("");
		}
		function s(t) {
			for (var r = [], i = 0, e = t.length; i < e; i++) {
				var n = t.codePointAt(i);
				if (n <= 127) r.push(n);
				else if (n <= 2047)
					r.push(192 | (n >>> 6)), r.push(128 | (63 & n));
				else if (n <= 55295 || (n >= 57344 && n <= 65535))
					r.push(224 | (n >>> 12)),
						r.push(128 | ((n >>> 6) & 63)),
						r.push(128 | (63 & n));
				else {
					if (!(n >= 65536 && n <= 1114111))
						throw (r.push(n), new Error("input is not supported"));
					i++,
						r.push(240 | ((n >>> 18) & 28)),
						r.push(128 | ((n >>> 12) & 63)),
						r.push(128 | ((n >>> 6) & 63)),
						r.push(128 | (63 & n));
				}
			}
			return r;
		}
		function u(t) {
			for (var r = [], i = 0, e = t.length; i < e; i++)
				t[i] >= 240 && t[i] <= 247
					? (r.push(
							String.fromCodePoint(
								((7 & t[i]) << 18) +
									((63 & t[i + 1]) << 12) +
									((63 & t[i + 2]) << 6) +
									(63 & t[i + 3])
							)
					  ),
					  (i += 3))
					: t[i] >= 224 && t[i] <= 239
					? (r.push(
							String.fromCodePoint(
								((15 & t[i]) << 12) +
									((63 & t[i + 1]) << 6) +
									(63 & t[i + 2])
							)
					  ),
					  (i += 2))
					: t[i] >= 192 && t[i] <= 223
					? (r.push(
							String.fromCodePoint(
								((31 & t[i]) << 6) + (63 & t[i + 1])
							)
					  ),
					  i++)
					: r.push(String.fromCodePoint(t[i]));
			return r.join("");
		}
		function h(t, r) {
			return (t << r) | (t >>> (32 - r));
		}
		function a(t) {
			return (
				((255 & m[(t >>> 24) & 255]) << 24) |
				((255 & m[(t >>> 16) & 255]) << 16) |
				((255 & m[(t >>> 8) & 255]) << 8) |
				(255 & m[255 & t])
			);
		}
		function f(t) {
			return t ^ h(t, 2) ^ h(t, 10) ^ h(t, 18) ^ h(t, 24);
		}
		function c(t) {
			return t ^ h(t, 13) ^ h(t, 23);
		}
		function l(t, r, i) {
			for (var e = new Array(4), n = new Array(4), o = 0; o < 4; o++)
				(n[0] = 255 & t[4 * o]),
					(n[1] = 255 & t[4 * o + 1]),
					(n[2] = 255 & t[4 * o + 2]),
					(n[3] = 255 & t[4 * o + 3]),
					(e[o] = (n[0] << 24) | (n[1] << 16) | (n[2] << 8) | n[3]);
			for (var s, u = 0; u < 32; u += 4)
				(s = e[1] ^ e[2] ^ e[3] ^ i[u + 0]),
					(e[0] ^= f(a(s))),
					(s = e[2] ^ e[3] ^ e[0] ^ i[u + 1]),
					(e[1] ^= f(a(s))),
					(s = e[3] ^ e[0] ^ e[1] ^ i[u + 2]),
					(e[2] ^= f(a(s))),
					(s = e[0] ^ e[1] ^ e[2] ^ i[u + 3]),
					(e[3] ^= f(a(s)));
			for (var h = 0; h < 16; h += 4)
				(r[h] = (e[3 - h / 4] >>> 24) & 255),
					(r[h + 1] = (e[3 - h / 4] >>> 16) & 255),
					(r[h + 2] = (e[3 - h / 4] >>> 8) & 255),
					(r[h + 3] = 255 & e[3 - h / 4]);
		}
		function p(t, r, i) {
			for (var e = new Array(4), n = new Array(4), o = 0; o < 4; o++)
				(n[0] = 255 & t[0 + 4 * o]),
					(n[1] = 255 & t[1 + 4 * o]),
					(n[2] = 255 & t[2 + 4 * o]),
					(n[3] = 255 & t[3 + 4 * o]),
					(e[o] = (n[0] << 24) | (n[1] << 16) | (n[2] << 8) | n[3]);
			(e[0] ^= 2746333894),
				(e[1] ^= 1453994832),
				(e[2] ^= 1736282519),
				(e[3] ^= 2993693404);
			for (var s, u = 0; u < 32; u += 4)
				(s = e[1] ^ e[2] ^ e[3] ^ T[u + 0]),
					(r[u + 0] = e[0] ^= c(a(s))),
					(s = e[2] ^ e[3] ^ e[0] ^ T[u + 1]),
					(r[u + 1] = e[1] ^= c(a(s))),
					(s = e[3] ^ e[0] ^ e[1] ^ T[u + 2]),
					(r[u + 2] = e[2] ^= c(a(s))),
					(s = e[0] ^ e[1] ^ e[2] ^ T[u + 3]),
					(r[u + 3] = e[3] ^= c(a(s)));
			if (i === y)
				for (var h, f = 0; f < 16; f++)
					(h = r[f]), (r[f] = r[31 - f]), (r[31 - f] = h);
		}
		function v(t, r, i) {
			var h =
					arguments.length > 3 && void 0 !== arguments[3]
						? arguments[3]
						: {},
				a = h.padding,
				f = void 0 === a ? "pkcs#7" : a,
				c = h.mode,
				v = h.iv,
				m = void 0 === v ? [] : v,
				T = h.output,
				b = void 0 === T ? "string" : T;
			if (
				"cbc" === c &&
				("string" == typeof m && (m = n(m)), 16 !== m.length)
			)
				throw new Error("iv is invalid");
			if (("string" == typeof r && (r = n(r)), 16 !== r.length))
				throw new Error("key is invalid");
			if (
				((t =
					"string" == typeof t
						? i !== y
							? s(t)
							: n(t)
						: [].concat(e(t))),
				("pkcs#5" === f || "pkcs#7" === f) && i !== y)
			)
				for (var F = d - (t.length % d), w = 0; w < F; w++) t.push(F);
			var B = new Array(g);
			p(r, B, i);
			for (var x = [], S = m, D = t.length, I = 0; D >= d; ) {
				var E = t.slice(I, I + 16),
					q = new Array(16);
				if ("cbc" === c)
					for (var A = 0; A < d; A++) i !== y && (E[A] ^= S[A]);
				l(E, q, B);
				for (var P = 0; P < d; P++)
					"cbc" === c && i === y && (q[P] ^= S[P]), (x[I + P] = q[P]);
				"cbc" === c && (S = i !== y ? q : E), (D -= d), (I += d);
			}
			if (("pkcs#5" === f || "pkcs#7" === f) && i === y) {
				for (var O = x.length, R = x[O - 1], M = 1; M <= R; M++)
					if (x[O - M] !== R) throw new Error("padding is invalid");
				x.splice(O - R, R);
			}
			return "array" !== b ? (i !== y ? o(x) : u(x)) : x;
		}
		var y = 0,
			g = 32,
			d = 16,
			m = [
				214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40,
				251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38,
				73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84,
				11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149,
				128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243,
				115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129,
				178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30,
				36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135,
				212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200,
				158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206,
				249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147,
				50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96,
				192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253,
				142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146,
				187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193,
				49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180,
				176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9,
				197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121,
				238, 95, 62, 215, 203, 57, 72,
			],
			T = [
				462357, 472066609, 943670861, 1415275113, 1886879365,
				2358483617, 2830087869, 3301692121, 3773296373, 4228057617,
				404694573, 876298825, 1347903077, 1819507329, 2291111581,
				2762715833, 3234320085, 3705924337, 4177462797, 337322537,
				808926789, 1280531041, 1752135293, 2223739545, 2695343797,
				3166948049, 3638552301, 4110090761, 269950501, 741554753,
				1213159005, 1684763257,
			];
		t.exports = {
			encrypt: function (t, r, i) {
				return v(t, r, 1, i);
			},
			decrypt: function (t, r, i) {
				return v(t, r, 0, i);
			},
		};
	},
]);

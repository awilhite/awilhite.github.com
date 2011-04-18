function Complex() {

    if (String(this.constructor).substring(0, 18) != "function Complex()") {

        if (typeof arguments[0] == "object" && arguments[0].constructor == Complex) return arguments[0];
        else if (arguments.length >= 2) return new Complex(arguments[0], arguments[1]);
        else if (arguments.length == 1) return new Complex(arguments[0]);
        else
        return new Complex();
    }

    // Invoke as an new constructor function
    if (arguments.length >= 2) {
        this.x = Number(arguments[0]);
        this.y = Number(arguments[1]);
    } else if (arguments.length == 1) {
        this.x = Number(arguments[0]);
        this.y = 0;
    } else {
        this.x = 0;
        this.y = 0;
    }

    if (this.x === undefined) this.x = 0;
    if (this.y === undefined) this.y = 0;
}

Complex.prototype = {

    norm: function () {
        return this.x * this.x + this.y * this.y;
    },

    negate: function () {
        return new Complex(-this.x, -this.y);
    },

    toString: function () {
        if (arguments.length < 1) return "(" + this.x.toString() + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toString() + ")";
        else
        return "(" + this.x.toString(arguments[0]) + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toString(arguments[0]) + ")";
    },

    toFixed: function () {
        if (arguments.length < 1) return "(" + this.x.toFixed() + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toFixed() + ")";
        else
        return "(" + this.x.toFixed(arguments[0]) + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toFixed(arguments[0]) + ")";
    },
    toExponential: function () {
        if (arguments.length < 1) return "(" + this.x.toExponential() + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toExponential() + ")";
        else
        return "(" + this.x.toExponential(arguments[0]) + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toExponential(arguments[0]) + ")";
    },
    toPrecision: function () {
        if (arguments.length < 1) return "(" + this.x.toPrecision() + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toPrecision() + ")";
        else
        return "(" + this.x.toPrecision(arguments[0]) + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y).toPrecision(arguments[0]) + ")";
    },
    toStringShort: function () {
        if (this.y == 0) return this.x.toString();
        else
        return "(" + this.x + (this.y < 0 ? "-i" : "+i") + Math.abs(this.y) + ")";
    },
    valueOf: function () {
        return this.x;
    },
    conj: function () {
        return new Complex(this.x, -this.y);
    },
    real: function () {
        return this.x;
    },
    imag: function () {
        return this.y;
    },
    arg: function () {
        return Math.atan2(this.y, this.x);
    },
    abs: function () {
        if (Math.abs(this.x) > Math.abs(this.y)) return Math.abs(this.x) * Math.sqrt(1 + (this.y / this.x) * (this.y / this.x));
        else
        return Math.abs(this.y) * Math.sqrt(1 + (this.x / this.y) * (this.x / this.y));
    }
};

Complex.add = function (a, b) {
    return new Complex(a.x + b.x, a.y + b.y);
}
Complex.sub = function (a, b) {
    return new Complex(a.x - b.x, a.y - b.y);
}
Complex.mul = function (a, b) {
    return new Complex(a.x * b.x - a.y * b.y, a.y * b.x + a.x * b.y);
}
Complex.div = function (a, b) {
    if (Math.abs(b.x) >= Math.abs(b.y)) {
        var r = b.y / b.x;
        var s = b.x + r * b.y;
        return new Complex((a.x + a.y * r) / s, (a.y - a.x * r) / s);
    } else {
        var r = b.x / b.y;
        var s = b.y + r * b.x;
        return new Complex((a.x * r + a.y) / s, (a.y * r - a.x) / s);
    }
}
Complex.sqrt = function (a) {
    if (a.x > 0) {
        var aux = a.abs() + a.x;
        return new Complex(Math.sqrt(aux / 2), a.y / Math.sqrt(2 * aux));
    } else {
        var aux = a.abs() - a.x;
        if (a.y < 0) return new Complex(Math.abs(a.y) / Math.sqrt(2 * aux), -Math.sqrt(aux / 2));
        else
        return new Complex(Math.abs(a.y) / Math.sqrt(2 * aux), Math.sqrt(aux / 2));
    }
}
Complex.equal = function (a, b) {
    if (a.x == b.x && a.y == b.y) return true;
    else
    return false;
}
Complex.polar = function (r, theta) {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
}
// Transcendental functions
Complex.log = function (a) {
    return new Complex(Math.log(a.abs()), a.arg());
}
Complex.log10 = function (a) {
    return Complex.div(Complex.log(a), new Complex(Math.LN10));
}
Complex.exp = function (a) {
    return new Complex(Math.exp(a.real()) * Math.cos(a.imag()), Math.exp(a.real()) * Math.sin(a.imag()));
}
Complex.pow = function (a, b) {
    return Complex.exp(Complex.mul(Complex.log(a), b));
}
// Trigonometric functions
// Add Hyperbolic function for real artguments
Math.sinh = function (x) {
    return (Math.exp(x) - Math.exp(-x)) * 0.5;
}
Math.cosh = function (x) {
    return (Math.exp(x) + Math.exp(-x)) * 0.5;
}
Math.tanh = function (x) {
    return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
Complex.sin = function (t, u) {
    return new Complex(Math.sin(t) * Math.cosh(u), Math.cos(t) * Math.sinh(u));
}
Complex.cos = function (t, u) {
    return new Complex(Math.cos(t) * Math.cosh(u), -Math.sin(t) * Math.sinh(u));
}
Complex.tan = function (t, u) {
    var s = Math.cos(2 * t) + Math.cosh(2 * u);
    return new Complex(Math.sin(2 * t) / s, Math.sinh(2 * u) / s);
}
Complex.sinh = function (x) {
    return new Complex(Math.sinh(x.real()) * Math.cos(x.imag()), Math.cosh(x.real()) * Math.sin(x.imag()));
}
Complex.cosh = function (x) {
    return new Complex(Math.cosh(x.real()) * Math.cos(x.imag()), Math.sinh(x.real()) * Math.sin(x.imag()));
}
Complex.tanh = function (x) {
    var s = Math.cosh(2 * x.real()) + Math.cos(2 * x.imag());
    return new Complex(Math.sinh(2 * x.real()) / s, Math.sin(2 * x.imag()) / s);
}

// Class properties
Complex.zero = new Complex();
Complex.one = new Complex(1);
Complex.i = new Complex(0, 1);

// Miscellaneous parseComplex() function in it's various format: (float [+-]i float) or (float) or ([+-]i float)
// It also allows input without paranthese e.g. float [+-]i float, float, [+-]i float

function parseComplex(s) {
    var split_re = /^[\(]?([+-eE\.\d]*)([+-][iI][eE+-\.\d]+)?[\)]?$/;
    s = s.replace(/[\s]+/g, ""); // Remove all white spaces
    if (split_re.test(s) == true) {
        var rs, is, real, imag;
        rs = RegExp.$1;
        is = RegExp.$2;
        if (rs == "") real = 0;
        else real = parseFloat(rs);
        if (is != "") is = is.replace(/[iI]/, ""); // Remove the [iI]
        if (is == "") imag = 0;
        else imag = parseFloat(is);
        return new Complex(real, imag);
    } else
    return new Complex(NaN, NaN);
}


function Polynomial() {

    if (String(this.constructor).substring(0, 21) != "function Polynomial()") {
        if (arguments.length == 0) return new Polynomial(); // Return empty polynomial
        if (arguments[0] instanceof Polynomial) return arguments[0]; // Arguments already a polynomial. No conversion needed
        return new Polynomial(arguments[0]); // Arguments conversion to Polynomial type
    }

    this.c = new Array();

    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Polynomial) {
            this.c = this.c.concat(arguments[i].array());
        } else
        if (arguments[i] instanceof Array) this.c = this.c.concat(arguments[i]);
        else
        if (arguments[i] instanceof Complex) this.c[i] = arguments[i];
        else
        this.c[i] = Number(arguments[i]);
    }
    this.normalize();
}

// Remove leading zeros in the polynomial
Polynomial.prototype.normalize = function () {
    while ((this.c[0] instanceof Complex ? Complex.equal(this.c[0], Complex.zero) : this.c[0] == 0)) this.c.shift();
    if (this.c.length == 0) this.c[0] = 0;
    return this;
}

// Convert Complex number to real if imaginary portion is zero
Polynomial.prototype.simplify = function () {
    for (var i = 0; i < this.c.length; i++) if (this.c[i] instanceof Complex && this.c[i].imag() == 0) this.c[i] = this.c[i].real();
    else if (this.c[i] == undefined) this.c[i] = 0;
    return this;
}

// Return the degree of the polynomial
Polynomial.prototype.degree = function () {
    return this.c.length - 1;
}

// Return the coefficient for x^inx
Polynomial.prototype.getcoeff = function (inx) {
    var i = this.c.length - 1 - inx;
    if (i < 0 || inx < 0) return NaN;
    else
    return this.c[i];
}

// Set the coefficient for x^inx
Polynomial.prototype.setcoeff = function (inx, coeff) {
    var i = this.c.length - 1 - inx;
    if (i < 0 || inx < 0) return NaN;
    else
    return (this.c[i] = coeff);
}

// Convert Polynomial to string
Polynomial.prototype.toString = function () {
    var ss = "";
    for (var i = 0; i < this.c.length; i++) {
        var n = this.c.length - i - 1;
        if (this.c[i] instanceof Complex) { // Complex coefficients
            if (Complex.equal(this.c[i], Complex.zero) && this.c.length > 1) continue;
            ss += "+(";
            if (this.c[i].real() !== 0 || this.c[i].imag() == 0) ss += (this.c[i].real() < 0 ? "-" : "") + Math.abs(this.c[i].real());
            if (this.c[i].imag() !== 0) ss += (this.c[i].imag() < 0 ? "-" : "+") + "i" + Math.abs(this.c[i].imag());
            ss += ")";
        } else { //Real coefficients
            if (this.c[i] === 0 && this.c.length > 1) continue;
            ss += (this.c[i] < 0 ? "-" : "+") + Math.abs(this.c[i]);
        }
        if (n !== 0) ss += "x";
        if (n > 1) ss += "^" + n;
    }
    return ss;
}

Polynomial.prototype.valueof = function () {
    return this.c;
}

Polynomial.prototype.isReal = function () {
    for (var i = 0; i < this.c.length; i++) if (this.c[i] instanceof Complex) return false;
    return true;
}

Polynomial.prototype.isComplex = function () {
    return !this.isReal();
}

Polynomial.prototype.derivative = function () {
    var d = new Polynomial();
    var n = this.degree();
    for (var i = 0; i < n; i++) if (this.c[i] instanceof Complex) d.c[i] = new Complex(this.c[i].real() * (n - i), this.c[i].imag() * (n - i));
    else d.c[i] = this.c[i] * (n - i);
    return d;
}

Polynomial.prototype.value = function (z) {
    var i, fz;

    if (this.isReal()) {
        if (z instanceof Complex) { // Real cooefficients and complex z
            var p, q, s, r, t;
            p = -2.0 * z.real();
            q = z.norm();
            s = 0;
            r = this.c[0];
            for (i = 1; i < this.c.length - 1; i++) {
                t = this.c[i] - p * r - q * s;
                s = r;
                r = t;
            }
            fz = new Complex(this.c[this.c.length - 1] + z.real() * r - q * s, z.imag() * r);
            return fz; // Return Complex
        } else { // Real cooefficients and real z
            fz = this.c[0];
            for (i = 1; i < this.c.length; i++) fz = fz * z + this.c[i];
            return fz; // Return real;
        }
    } else // Evaluate a polynominal complex coeeficients, at a real or complex number z using Horner, return complex function value
    {
        var zz;
        fz = Complex(this.c[0]);
        zz = Complex(z);
        for (i = 1; i < this.c.length; i++) {
            fz = Complex.add(Complex.mul(fz, zz), Complex(this.c[i]));
        }
        return fz; // return Complex
    }
}

Polynomial.prototype.deflate = function (z) {
    var i, n = this.degree();
    if (this.isReal()) {
    	
    	var r, u;
        if (z instanceof Complex) { //Complex root deflation
            if (Complex.equal(z, Complex.zero) === false) {
                r = -2.0 * z.real();
                u = z.norm();
                this.c[1] -= r * this.c[0];
                for (i = 2; i < n - 1; i++) this.c[i] = this.c[i] - r * this.c[i - 1] - u * this.c[i - 2];
                this.c.length--;
            }
        } else // Real root deflation
        {
            if (z !== 0) for (r = 0, i = 0; i < n; i++) this.c[i] = r = r * z + this.c[i];
        }
        
    } else {
        if (Complex.equal(Complex(z), Complex.zero) === false) {
            var z0, zz;
            z0 = Complex.zero;
            zz = Complex(z);
            for (i = 0; i < n; i++) {
                this.c[i] = Complex.add(Complex.mul(z0, zz), Complex(this.c[i]));
                z0 = Complex(this.c[i]);
            }
        }
    }
    this.c.length--;
}

Polynomial.prototype.compositedeflate = function (z) {
    var i, k, r, u, n = this.degree();
    var b = [];
    var c = [];
    if (this.isReal()) {
        if (z instanceof Complex) { //Complex root deflation
            if (Complex.equal(z, Complex.zero) == false) { // Forward & Backward deflation
                r = -2.0 * z.real();
                u = z.norm();
                b[0] = this.c[0];
                b[1] = this.c[1] - r * b[0];
                c[n - 2] = this.c[n] / u;
                c[n - 3] = (this.c[n - 1] - r * c[n - 2]) / u;
                for (i = 2; i < n - 1; i++) {
                    b[i] = this.c[i] - r * b[i - 1] - u * b[i - 2];
                    c[n - 2 - i] = (this.c[n - i] - c[n - i] - r * c[n - i - 1]) / u;
                }
                this.c.length--;
            }
        } else // Real root composite deflation
        if (z != 0) { // Forward & Backward deflation
            for (r = 0, u = 0, i = 0; i < n; i++) {
                b[i] = r = r * z + this.c[i];
                c[n - i - 1] = u = (u - this.c[n - i]) / z;
            }
        }
        //Join
        for (r = Number.MAX_VALUE, i = 0; i < n; i++) {
            u = Math.abs(b[i]) + Math.abs(c[i]);
            if (u != 0) {
                u = Math.abs(b[i] - c[i]) / u;
                if (u < r) {
                    r = u;
                    k = i;
                }
            }
        }
        for (i = k - 1; i >= 0; i--) this.c[i] = b[i]; // Forward deflation coefficient
        this.c[k] = 0.5 * (b[k] + c[k]);
        for (i = k + 1; i < n; i++) this.c[i] = c[i]; // Backward deflation coefficient
    } else {
        if (Complex.equal(Complex(z), Complex.zero) == false) {
            var zr, zs, zz;
            zz = Complex(z);
            zr = Complex.zero;
            zs = Complex.zero;
            // Backward and forward deflation
            for (i = 0; i < n; i++) {
                b[i] = Complex.add(Complex.mul(zr, zz), Complex(this.c[i]));
                zr = Complex(b[i]);
                c[n - i - 1] = Complex.div(Complex.sub(zs, Complex(this.c[n - i])), zz);
                zs = Complex(c[n - i - 1]);
            }
        }
        //Join
        for (r = Number.MAX_VALUE, i = 0; i < n; i++) {
            u = Complex(b[i]).abs() + Complex(c[i]).abs();
            if (u != 0) {
                u = Complex.sub(b[i], c[i]).abs() / u;
                if (u < r) {
                    r = u;
                    k = i;
                }
            }
        }
        for (i = k - 1; i >= 0; i--) this.c[i] = b[i]; // Forward deflation coefficient
        this.c[k] = Complex.mul(Complex(0.5), Complex.add(b[k], c[k]));
        for (i = k + 1; i < n; i++) this.c[i] = c[i]; // Backward deflation coefficient
    }
    alert("Com=" + this.c.toString() + "\nFor=" + b.toString() + "\nBck=" + c.toString() + "\nk=" + k);
    delete b, c;
    this.c.length--;
}

// Convert polynomial to a new array
Polynomial.prototype.array = function () {
    return this.c.concat();
}

// Concat polynomial elements to form a string
Polynomial.prototype.join = function (separator) {
    if (arguments.length == 0) return this.c.join();
    else
    return this.c.join(separator);
}


Polynomial.prototype.zeros = function (verbose, composite) {

    function startguess(p) {
        var r, min, u, n;
        n = p.degree();
        r = Math.log(Complex(p.getcoeff(0)).abs());
        min = Math.exp((r - Math.log(Complex(p.getcoeff(n)).abs())) / n);
        for (i = 1; i < n; i++)
        if (Complex.equal(Complex(p.getcoeff(n - i)), Complex.zero) == false) {
            u = Math.exp((r - Math.log(Complex(p.getcoeff(n - i)).abs())) / (n - i));
            if (u < min) min = u;
        }
        return min;
    }

    function changedirection(dz, m) {
        var z = new Complex(0.6, 0.8);
        z = Complex.mul(dz, z);
        z = Complex.mul(z, Complex(m));
        return z;
    }
    // Quadratic complex equation. Works for both real and complex coefficients
    // Res contains the result as complex roots. a.length is 2 or 3.

    function quadratic(p, res) {
        var v;
        if (p.degree() == 1) // a*x+b=0
        {
            res[1] = Complex.div(Complex(p.getcoeff(0)).negate(), Complex(p.getcoeff(1)));
        } else {
            var a = p.getcoeff(2),
                b = p.getcoeff(1),
                c = p.getcoeff(0); // a*x^2+b*x+c
            if (Complex.equal(Complex(b), Complex.zero) == true) // b==0, x=sqrt(-c/a)
            {
                res[1] = Complex.sqrt(Complex.div(Complex(c).negate(), Complex(a)));
                res[2] = res[1].negate();
            } else { // v = sqrt(1-4*a*c/(b^2))
                v = Complex.sqrt(Complex.sub(Complex.one, Complex.div(Complex.mul(Complex(4), Complex.mul(Complex(a), Complex(c))), Complex.mul(Complex(b), Complex(b)))));
                if (v.real() < 0) // x=(-1-v)*b/(2*a)
                res[1] = Complex.div(Complex.mul(Complex.sub(Complex.one.negate(), v), Complex(b)), Complex.mul(Complex(2), Complex(a)));
                else // x=(-1+v)*b/(2*a)
                res[1] = Complex.div(Complex.mul(Complex.add(Complex.one.negate(), v), Complex(b)), Complex.mul(Complex(2), Complex(a)));
                res[2] = Complex.div(Complex(c), Complex.mul(Complex(a), res[1])); // x2=c/(a*x1)
            }
        }
    }

    // Newton solver. Original Methode by K.Madsen BIT 1973
    // Calculate a upper bound for the rounding errors performed in a polynomial at a complex point.( Adam's test )or Kahan for a real point

    function upperbound(pol, z) {
        var p, q, u, s, r, e, i, t, n;
        n = pol.degree();
        if (z.imag() != 0) {
            p = -2.0 * z.real();
            q = z.norm();
            u = Math.sqrt(q);
            s = 0.0;
            r = pol.getcoeff(n);
            e = Math.abs(r) * (3.5 / 4.5);
            for (i = 1; i < n; i++) {
                t = pol.getcoeff(n - i) - p * r - q * s;
                s = r;
                r = t;
                e = u * e + Math.abs(t);
            }
            t = pol.getcoeff(0) + z.real() * r - q * s;
            e = u * e + Math.abs(t);
            e = (9.0 * e - 7.0 * (Math.abs(t) + Math.abs(r) * u) + Math.abs(z.real()) * Math.abs(r) * 2.0) * Math.pow(2, -53 + 1);
        } else {
            t = pol.getcoeff(n);
            e = Math.abs(t) * (0.5);
            for (i = 0; i < n; i++) {
                t = t * z.real() + pol.getcoeff(n - i);
                e = Math.abs(z.real()) * e + Math.abs(t);
            }
            e = (2 * e - Math.abs(t)) * Math.pow(2, -53 + 1);
        }
        return e * e;
    }

    // Solve quadratic equation or less directly. Works only for real coefficients

    function rquadratic(p, res) {
        var r;
        if (p.degree() == 2) {
            if (p.getcoeff(1) == 0.0) {
                r = -p.getcoeff(0) / p.getcoeff(2);
                if (r < 0) {
                    res[1] = new Complex(0, Math.sqrt(-r));
                    res[2] = new Complex(0, -res[1].imag());
                } else {
                    res[1] = new Complex(Math.sqrt(r), 0);
                    res[2] = new Complex(-res[1].real(), 0);
                }
            } else {
                r = 1 - 4 * p.getcoeff(2) * p.getcoeff(0) / (Math.pow(p.getcoeff(1), 2));
                if (r < 0) {
                    res[1] = new Complex(-p.getcoeff(1) / (2 * p.getcoeff(2)), p.getcoeff(1) * Math.sqrt(-r) / (2 * p.getcoeff(2)));
                    res[2] = res[1].conj();
                } else {
                    res[1] = new Complex((-1 - Math.sqrt(r)) * p.getcoeff(1) / (2 * p.getcoeff(2)), 0);
                    res[2] = new Complex(p.getcoeff(0) / (p.getcoeff(2) * res[1].real()), 0);
                }
            }
        } else if (p.degree() == 1) {
            res[1] = new Complex(-p.getcoeff(0) / p.getcoeff(1), 0);
        } // a*x+b=0
    }

    // Verbose. Print a complex variable

    function print_z(t, z) {
        return t + z.toStringShort() + "\n";
    }
    // Print out change in dz

    function print_dz(text, dz0, dz) {
        return text + " Old dz=" + dz0.toPrecision(2) + " New dz=" + dz.toPrecision(2) + "\n";
    }
    // Verbose. Print a full iterations step using smart precision

    function print_iteration(t, z, dz, f, endl) {
        var p = 15;
        var ss = "";
        // Return magnitude

        function magnitude(x) {
            x = Math.abs(x);
            if (x == 0) return 0;
            return Math.round(Math.LOG10E * Math.log(x));
        }
        ss += t;
        p = Math.max(magnitude(z.real()), magnitude(z.imag())) - Math.max(magnitude(dz.real()), magnitude(dz.imag()));
        p = Math.max(0, p) + 1;
        ss += " z[" + p + "]=" + z.toPrecision(p);
        ss += " dz=" + dz.toExponential(2);
        ss += " f(z)=" + Math.sqrt(f).toExponential(1);
        if (endl == true) ss += "\n";
        return ss;
    }

    // Coeff is the coeeficients where coeff[0..n] in increasing power
    // Solutions is the complex value of the roots in the range [1..n]
    // form is the GUI output area

    function newton_real(pp, solutions, verbose) {
        var z, z0, fz, fz0, fz1, dz, dz0;
        var n, f, f0, ff, f2, u, stage1, r, r0, i;
        var ss = "";
        var p = new Polynomial(pp);
        var itertrail = new Array;

        for (; p.getcoeff(0) == 0; p.deflate(0)) {
            solutions[p.degree()] = Complex.zero;
            itertrail[itertrail.length] = [];
        } // Find all zero solutions
        while (p.degree() > 2) // Loop until all roots are found
        {
            var trail = [];
            var p1 = p.derivative();
            n = p.degree();
            u = startguess(p);
            f0 = ff = 2.0 * Math.pow(p.getcoeff(0), 2);
            z0 = Complex.zero;
            fz0 = Complex(p.getcoeff(1));
            z = new Complex(p.getcoeff(1) == 0.0 ? 1 : -p.getcoeff(0) / p.getcoeff(1), 0);
            z.x = z.real() / Math.abs(z.real()) * u * 0.5;
            dz = new Complex(-z.real(), 0);
            fz = p.value(z);
            f = fz.norm();
            r0 = 2.5 * u;
            r = dz.norm();
            eps = 4 * n * n * f0 * Math.pow(2, -53 * 2);
            itercnt = 0;
            trail.length = 0;
            trail[trail.length] = z;
            // Main loop
            for (stage1 = true;
            (z.real() + dz.real() != z.real() || z.imag() + dz.imag() != z.imag()) && f > eps && itercnt < 50; itercnt++) {
                var fwz = Complex.zero;
                var wz = Complex.zero;
                fz1 = p1.value(z);
                u = fz1.norm();
                if (u == 0.0) // True saddelpoint
                {
                    dz0 = dz;
                    dz = changedirection(dz, 5.0);
                } else {
                    dz = Complex.div(fz, fz1);
                    // Determine stage
                    fwz = Complex.sub(fz0, fz1);
                    wz = Complex.sub(z0, z);
                    f2 = fwz.norm() / wz.norm();
                    stage1 = (f2 / u > u / f / 4 || f != ff) ? true : false;
                    r = dz.abs();
                    if (r > r0) {
                        dz0 = dz;
                        dz = changedirection(dz, r0 / r);
                        r = dz.abs(); // HVE 2009-04-14 to avoid overflow
                        if (verbose) {
                            ss += print_dz("\tdz>5*dz0 =>Alter direction:", dz0, dz);
                        }
                    }
                    r0 = r * 5.0;
                }
                z0 = z;
                f0 = f;
                fz0 = fz;

                // Determine the multiplication of dz step size
                // Inner loop
                for (domain_error = true; domain_error == true;) {
                    domain_error = false;
                    z = Complex.sub(z0, dz);
                    fz = p.value(z);
                    ff = f = fz.norm();
                    if (verbose) {
                        ss += print_iteration("\tNewton Step: ", z, dz, f, true);
                    }
                    if (verbose && stage1 == true) {
                        ss += "\tFunction value " + (f > f0 ? "increase=>try shorten the step" : "decrease=>try multiple steps in that direction") + "\n";
                    }

                    if (stage1 == true) {
                        wz = z;
                        div2 = f > f0 ? true : false;
                        for (i = 1; i <= n; i++) {
                            if (div2 == true) {
                                dz = Complex.mul(dz, Complex(0.5));
                                wz = Complex.sub(z0, dz);
                            } else {
                                wz = Complex.sub(wz, dz);
                            }
                            fwz = p.value(wz);
                            fw = fwz.norm();
                            if (verbose) {
                                ss += print_iteration("\tTry Step: ", wz, dz, fw, true);
                            }
                            if (fw >= f) {
                                if (verbose) {
                                    ss += "\t        : No improvement=>Discard last try step\n";
                                }
                                break;
                            }
                            f = fw;
                            fz = fwz;
                            z = wz;
                            if (verbose) {
                                ss += "\t        : Improved=>Continue stepping\n";
                            }
                            if (div2 == true && i == 2) {
                                dz = changedirection(dz, 0.5);
                                z = Complex.sub(z0, dz);
                                fz = p.value(z);
                                f = fz.norm();
                                break;
                            }
                        }
                    } else {
                        // calculate the upper bound of erros using Adam's test
                        eps = upperbound(p, z);
                    }

                    if (r < z.abs() * Math.pow(2, -53 / 2) && f >= f0) { // Domain rounding errors
                        z = z0;
                        dz0 = dz;
                        dz = changedirection(dz, 0.5);
                        if (z.real() + dz.real() != z.real() || z.imag() + dz.imag() != z.imag()) domain_error = true;
                    }
                } // End Inner Loop
                trail[trail.length] = z;
            } // End Main loop
            itertrail[itertrail.length] = trail;
            if (verbose) {
                ss += "Stop Criteria satisfied after " + itercnt + " Iterations\n";
                ss += print_iteration("Final Newton", z, dz, f, true);
                if (itercnt >= 50) ss += "Warning: Exceed limit of Iteration steps\n"
            }
            z0 = new Complex(z.real());
            fz = p.value(z0);
            if (fz.norm() <= f) { // Real root
                solutions[n] = z0;
                if (composite) p.compositedeflate(z0.real());
                else p.deflate(z0.real());
            } else { // Complex root
                if (Math.abs(z.real()) < Math.abs(z.imag())) {
                    z0 = new Complex(0, z.imag());
                    fz = p.value(z0);
                    if (fz.norm() <= f) z = z0;
                }
                solutions[n] = z;
                solutions[n - 1] = z.conj();
                if (composite) p.compositedeflate(z);
                else p.deflate(z);
                itertrail[itertrail.length] = z.conj();
            }

            delete p1; //Delete a1 coeeficients
        } // End while(n>2)
        // The last 1 or 2 roots are found directly
        if (p.degree() > 0) {
            rquadratic(p, solutions);
        }
        pp.it = itertrail;
        return ss;
    }

    // Coeff is the complex coeeficients where coeff[0..n] in increasing power
    // Solutions is the complex value of the roots in the range [1..n]
    // form is the GUI output area

    function newton_complex(pp, solutions, verbose) {
        var z0, f0z, z, dz, dz0, f1z, fz;
        var itercnt, stage1, i;
        var r, r0, u, f, f0, eps, f1, ff, i, n;
        var ss = "";
        var p = new Polynomial(pp);
        var itertrail = new Array;

        for (; Complex.equal(Complex(p.getcoeff(0)), Complex.zero) == true; p.deflate(0)) solutions[p.degree()] = Complex.zero;
        while (p.degree() > 2) // Loop as long as we have more than a quadratic polynominal
        {
            var trail = new Array;
            var p1 = p.derivative();
            n = p.degree();
            // Setup the iteration
            u = startguess(p); // Find a suitable radius where all roots are outside circle with radius u
            z0 = Complex.zero;
            ff = f0 = Complex(p.getcoeff(0)).norm();
            f0z = Complex(p.getcoeff(1));
            if (Complex.equal(f0z, Complex.zero) == true) z = Complex.one;
            else z = Complex.div(Complex(p.getcoeff(0)).negate(), Complex(p.getcoeff(1)));
            z = Complex.mul(Complex.div(z, new Complex(z.abs(), 0)), new Complex(u * 0.5, 0));
            dz = z;
            fz = p.value(z);
            f = fz.norm();
            r0 = 2.5 * u;
            eps = 4 * n * n * f0 * Math.pow(2, -53 * 2);
            trail.length = 0;
            trail[trail.length] = z;
            // Start Main iteration
            for (itercnt = 0; Complex.equal(Complex.add(z, dz), z) == false && f > eps && itercnt < 50; itercnt++) {
                if (verbose) {
                    ss += "Iteration: " + (itercnt + 1) + "\n";
                }
                f1z = p1.value(z);
                f1 = f1z.norm();
                if (f1 == 0.0) {
                    dz0 = dz;
                    dz = changedirection(dz, 5.0);
                    if (verbose) {
                        ss += print_dz("\tSaddle point detected=>Alter direction:", dz0, dz);
                    }
                } else {
                    var wsq;
                    var wz = Complex.zero;
                    dz = Complex.div(fz, f1z);
                    wz = Complex.div(Complex.sub(f0z, f1z), Complex.sub(z0, z));
                    wsq = wz.norm();
                    stage1 = (wsq / f1 > f1 / f / 4) || (f != ff);
                    r = dz.abs();
                    if (r > r0) {
                        dz0 = dz;
                        dz = changedirection(dz, r0 / r);
                        r = dz.abs(); // HVE 2009-04-14 to avoid overflow
                    }
                    r0 = 5 * r;
                }
                z0 = z;
                f0 = f;
                f0z = f1z;
                // Determine the multiplication of dz step size
                // Inner loop
                for (domain_error = true; domain_error == true;) {
                    domain_error = false;
                    z = Complex.sub(z0, dz);
                    fz = p.value(z);
                    ff = f = fz.norm();
                    
                    if (stage1 == true) { // Try multiple steps or shorten steps depending of f is an improvment or not
                        var div2, fn;
                        var zn = Complex.zero;
                        var fzn = Complex.zero;
                        zn = z;
                        for (i = 1, div2 = f > f0; i <= n; i++) {
                            if (div2 == true) { // Shorten steps
                                dz = Complex.mul(dz, Complex(0.5));
                                zn = Complex.sub(z0, dz);
                            } else
                            zn = Complex.sub(zn, dz); // try another step in the same direction
                            fzn = p.value(zn);
                            fn = fzn.norm();
                            if (verbose) {
                                ss += print_iteration("\tTry Step: ", zn, dz, fn, true);
                            }

                            if (fn >= f) {
                                break;
                            } // Break if no improvement
                            f = fn;
                            fz = fzn;
                            z = zn;
                            if (div2 == true && i == 2) { // To many shorten steps try another direction
                                dz = changedirection(dz, 1.0);
                                z = Complex.sub(z0, dz);
                                fz = p.value(z);
                                f = fz.norm();
                                if (verbose) {
                                    ss += print_iteration("\t        : Probably local saddlepoint=>Alter Direction: ", z, dz, f, true);
                                }
                                break;
                            }
                        }
                    }

                    if (r < z.abs() * Math.pow(2.0, -26.0) && f >= f0) {
                        z = z0;
                        dz0 = dz;
                        dz = changedirection(dz, 0.5);
                        if (Complex.equal(Complex.add(z, dz), z) == false) domain_error = true;
                    }
                }
                trail[trail.length] = z;
            }

            itertrail[itertrail.length] = trail;
            if (Math.abs(z.real()) >= Math.abs(z.imag())) z0 = new Complex(z.real());
            else z0 = new Complex(0, z.imag());
            fz = p.value(z0);
            if (fz.norm() <= f) z = z0;
            solutions[n] = z;
            // Deflate complex root
            if (composite) p.compositedeflate(z);
            else p.deflate(z);
            delete p1; //Delete p1 polynomial
        }

        // The last 1 or 2 roots are found directly
        if (p.degree() > 0) {
            quadratic(p, solutions);
        }
        pp.it = itertrail;
        return ss;
    }
    // End Newton solver
    if (this.c != undefined && this.degree() > 0) {
        var solutions = [];
        if (this.isReal()) solutions[0] = newton_real(this, solutions, verbose);
        else solutions[0] = newton_complex(this, solutions, verbose);
        return solutions;
    }
    return [];
}

// Class Methods
Polynomial.add = function (a, b) {
    var i, ac, bc, na, nb, nc;
    var c = new Polynomial();
    na = a.degree();
    nb = b.degree();
    nc = Math.max(na, nb);
    c.c.length = nc + 1;
    for (i = 0; i <= Math.min(na, nb); i++) {
        ac = a.getcoeff(i);
        bc = b.getcoeff(i);
        if (ac instanceof Complex || bc instanceof Complex) c.setcoeff(i, Complex.add(Complex(ac), Complex(bc)));
        else c.setcoeff(i, ac + bc);
    }
    for (; i <= nc; i++) c.setcoeff(i, (na > nb ? a.getcoeff(i) : b.getcoeff(i)));
    return c.normalize();
}
Polynomial.sub = function (a, b) {
    var i, ac, bc, na, nb, nc;
    var c = new Polynomial();
    na = a.degree();
    nb = b.degree();
    nc = Math.max(na, nb);
    c.c.length = nc + 1;
    for (i = 0; i <= Math.min(na, nb); i++) {
        ac = a.getcoeff(i);
        bc = b.getcoeff(i);
        if (ac instanceof Complex || bc instanceof Complex) c.setcoeff(i, Complex.sub(Complex(ac), Complex(bc)));
        else c.setcoeff(i, ac - bc);
    }
    for (; i <= nc; i++) if (na > nb) c.setcoeff(i, a.getcoeff(i));
    else {
        bc = b.getcoeff(i);
        if (bc instanceof Complex) bc = bc.negate();
        else bc = -bc;
        c.setcoeff(i, bc);
    }
    return c.normalize();
}
Polynomial.mul = function (a, b) {
    var na, nb;
    var c;
    na = a.degree();
    nb = b.degree();
    c = new Polynomial();
    for (var i = 0; i <= na + nb; i++) c.c[i] = 0;
    for (var i = 0; i <= na; i++) for (var j = 0; j <= nb; j++) {
        if (a.c[i] instanceof Complex || b.c[i] instanceof Complex || c.c[i + j] instanceof Complex) c.c[i + j] = Complex.add(Complex(c.c[i + j]), Complex.mul(Complex(a.c[i]), Complex(b.c[j])))
        else
        c.c[i + j] += a.c[i] * b.c[j];
    }
    return c.normalize();
}
Polynomial.div = function (a, b) {
    var na, nb, nq;
    var q, r;
    na = a.degree();
    nb = b.degree();
    q = new Polynomial();
    r = new Polynomial(a);
    nq = na - nb;
    for (var k = 0; k <= nq; k++) {
        q.c[k] = r.c[k] / b.c[0];
        for (var j = 0; j <= nb; j++) r.c[j + k] -= q.c[k] * b.c[j];
    }
    return q.normalize();
}
Polynomial.rem = function (a, b) {
    var na, nb, nq;
    var q, r;
    na = a.degree();
    nb = b.degree();
    q = new Polynomial();
    r = new Polynomial(a);
    nq = na - nb;
    for (var k = 0; k <= nq; k++) {
        q.c[k] = r.c[k] / b.c[0];
        for (var j = 0; j <= nb; j++) r.c[j + k] -= q.c[k] * b.c[j];
    }
    r.c = r.c.slice(nq);
    return r.normalize();
}
Polynomial.pow = function (a, n) {
    var r = new Polynomial(1);
    if (n == 0) return r;
    var p = new Polynomial(a);
    for (var k = n; k > 0; k >>= 1) {
        if (k & 0x1) r = Polynomial.mul(r, p);
        p = Polynomial.mul(p, p);
    }
    return r;
}

// Class properties
Polynomial.zero = new Polynomial();
Polynomial.one = new Polynomial(1);

var e_errors;
var error_msg;

function parsePolynomial(arg) {
    var depth = 0; // Recursive depth of functions calls
    var err_msg = []; // Error message
    var coeff = new Polynomial;

    function splitexpression(arg) {
        var re = /([\+\-\*\/\%\(\)\^=xX])/g;
        var input = [];
        var fi = 0;
        while ((r = re.exec(arg)) != null) {
            if (fi < r.index) {
                var a;
                a = arg.slice(fi, r.index);
                if ((a = a.replace(/\s+/g, "")).length != 0) input[input.length] = a;
            }
            input[input.length] = r[0];
            fi = re.lastIndex;
        } {
            var a;
            a = arg.slice(fi);
            if ((a = a.replace(/\s+/g, "")).length != 0) input[input.length] = a;
        }
        return input;
    }

    function next(a) // Find next non white space terminal symbol and remove wite spaces
    {
        while (a.length > 0 && (a[0] = a[0].replace(/\s+/g, "")).length == 0) a.shift();
        return a[0];
    }

    function constant(a, xflg) {
        var n, cflag = false,
            sign = 1;
        var v = NaN;
        var fe = /^[iI]?(([\d]+([\.][\d]*)?)|([\.][\d]+))([eE][\d]*)?([iI])?$/; //* to prevent the fe.test to failed. The a missing exponent constant is detected later on
        n = next(a);
        if (n == "+" || n == "-") {
            if (n == "-") sign = -1;
            a.shift();
            n = next(a);
        }

        if (fe.test(n)) {
            if (n.charAt(0).toLowerCase() == "i") {
                cflag = true;
                n = n.substr(1);
            }
            if (!isNaN(parseFloat(n)) && n.charAt(n.length - 1).toLowerCase() == "e") { // Need to be an optional sign and an integer
                a.shift();
                if (a.length > 0 && (a[0] == "+" || a[0] == "-")) {
                    n += a[0];
                    a.shift();
                }
                if (a.length > 0 && !isNaN(parseInt(a[0]))) {
                    n += a[0];
                }
            }
            v = parseFloat(n);
            var feback = /(([\d]+([\.][\d]*)?)|([\.][\d]+))([eE][\d]+)?[iI]$/
            if (feback.test(n)) cflag = true;
            if (isNaN(v)) console.log("not a number - parsing Polynomial");
            else a.shift();
            v = sign * v;
            if (cflag == true) v = new Complex(0, v);
        } else {
            var xx = /^[xX]$/;
            if (xflg && xx.test(n)) {
                a.shift();
                v = new Polynomial(1, 0);
                if (a[0] == "^") {
                    a.shift();
                    t = constant(a, false);
                    if (!(t instanceof Complex) && Number(t) == Math.round(t)) {
                        v = Polynomial.pow(v, t);
                    } else rpsyntax(a, "; " + t + " Power of operator ^ needs to be an integer.", "Constant", "\nA power of an operator ^ needs to be an integer.\nE.g. x^3, x^-2, x^+4 or similar");
                    if (sign < 0) {
                        var t = new Polynomial(sign);
                        v = Polynomial.mul(v, t);
                    }
                }
            }
        }
        return v;
    }

    function Expression(a) {
        var v;
        v = Factor(a);
        v = TermPrime(a, v);
        v = xTermPrime(a, v);
        v = ExpressionPrime(a, v);
        return v;
    }

    function ExpressionPrime(a, v) {
        var t;
        switch (a[0]) {
        case "+":
            a.shift();
            t = xTerm(a);
            v = Polynomial.add(v, t);
            v = ExpressionPrime(a, v);
            break;
        case "-":
            a.shift();
            t = xTerm(a);
            v = Polynomial.sub(v, t);
            v = ExpressionPrime(a, v);
            break
        }
        return v;
    }

    function xTermPrime(a, v) {
        var t;
        switch (a[0]) {
        case "x":
        case "X":
            a.shift();
            if (a[0] == "^") {
                a.shift();
                t = constant(a, false);
                if ((t instanceof Complex) || Number(t) != Math.round(t)) rpsyntax(a, "; " + t + " Power of X needs to be a integer.", "xTermprime", "\nA power exponent needs to be an integer.\nE.g. 3, +2, -4 or similar");
            } else t = 1;
            for (; t > 0; t--) v.c.push(0);
            v = xTermPrime(a, v);
            break;
        }
        return v;
    }

    function TermPrime(a, v) {
        var t;
        switch (a[0]) {
        case "(":
            /* Implicit multiplication */
        case "x":
            /* Implicit multiplication */
        case "X":
            /* Implicit multiplication */
        case "*":
            if (a[0] == "*") a.shift();
            t = Factor(a);
            v = Polynomial.mul(v, t);
            v = TermPrime(a, v);
            break;
        case "/":
            a.shift();
            t = Factor(a);
            v = Polynomial.div(v, t);
            v = TermPrime(a, v);
            break;
        case "%":
            a.shift();
            t = Factor(a);
            v = Polynomial.rem(v, t);
            v = TermPrime(a, v);
            break;
        }
        return v;
    }

    function Factor(a) {
        var v;
        v = PrimaryExpression(a);
        v = FactorPrime(a, v);
        return v;
    }

    function FactorPrime(a, v) {
        var t;
        if (a[0] == "^") {
            a.shift();
            t = constant(a, false);
            if (!(t instanceof Complex) && Number(t) == Math.round(t)) {
                v = Polynomial.pow(v, t);
            } else console.log("Power of operator ^ needs to be an integer.");
            v = FactorPrime(a, v);
        }
        return v;
    }

    function PrimaryExpression(a) {
        var v = NaN;
        var pl;
        switch (next(a)) {
	        case "(":
	            a.shift();
	            v = Expression(a);
	            if (a[0] == ")") a.shift();
	            else console.log("Missing ) in expression.");
	            break;
	        default:
	            v = constant(a, true);
	            if (!(v instanceof Polynomial)) v = new Polynomial(v);
	            break;
        }
        return v;
    }

    var ip = splitexpression(arg);
    var value = Expression(ip);
    if (ip.length > 0 && ip[0] != "") console.log("Missing Operator.");
    return value;
}

function Polynomial() {
    var z = new Complex;
    var eq = $("form[name='poly'] input[type='text']")[0].value.split(" ");
    var coeff = parsePolynomial(eq);
    var solutions = coeff.zeros();
    console.log(solutions);
}
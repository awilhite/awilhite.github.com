/*****
*
*   Vector2D.js
*
*   copyright 2001-2002, Kevin Lindsey
*
*****/

function Vector2D(x, y) {
        this.x = x;
        this.y = y;
        return this;
}

Vector2D.prototype.length = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

Vector2D.prototype.dot = function(that) {
    return this.x*that.x + this.y*that.y;
};

Vector2D.prototype.cross = function(that) {
    return this.x*that.y - this.y*that.x;
};

Vector2D.prototype.unit = function() {
    this.divideEquals( this.length() );

    return this;
};

Vector2D.prototype.add = function(that) {
    this.x += that.x;
    this.y += that.y;

    return this;
};

Vector2D.prototype.subtract = function(that) {
    this.x -= that.x;
    this.y -= that.y;

    return this;
};

Vector2D.prototype.multiply = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

Vector2D.prototype.divide = function(scalar) {
    this.x /= scalar;
    this.y /= scalar;

    return this;
};

Vector2D.prototype.perpendicular = function(that) {
    return this.subtract(this.project(that));
};

Vector2D.prototype.project = function(that) {
    var percent = this.dot(that) / that.dot(that);

    return that.multiply(percent);
};

Vector2D.prototype.toString = function() {
    return this.x + ", " + this.y;
};

Vector2D.fromVector = function(p1, p2) {
    return new Vector2D(
        p2.x - p1.x,
        p2.y - p1.y
    );
};
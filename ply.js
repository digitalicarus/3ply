var ply = function (raw) {
	this.raw = raw;
	this.parse();
};

ply.prototype.regex = {
	newline:    /\n/,
	space:      /\s+/,
	leadspace:  /^\s+/,
	trailspace: /\s+$/,
	leadnum:    /^-?[0-9]/
};

ply.prototype.trim = function (str) {
	return str
		.replace(this.regex.newline, '')
		.replace(this.regex.trailspace, '')
		.replace(this.regex.leadspace, '')
		;
};

ply.prototype.parse = function () {
	// start with vertices
	this.numVertices = parseInt(this.raw.match(/element\s+vertex\s+([0-9]*)/)[1], 10);
	this.numFaces    = parseInt(this.raw.match(/element\s+face\s+([0-9]*)/)[1], 10);
	this.data = this.raw
		.split('\n')
		.filter(function (v) { return v.match(this.regex.leadnum); }.bind(this))
		.map(function (v) { return this.trim(v).split(this.regex.space).map(function(v){ return parseFloat(v); }); }.bind(this))
		;

    this.vertices = this.data.slice(0, this.numVertices);
    this.faces = this.data.slice(this.numVertices, this.data.length);

};

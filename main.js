$.get('data/cube.ply')
.then(function (cow) {
	var beef          = new ply(cow)
	,   body          = document.body
	,   domFaces      = []
	,   domType       = 'tri'
	,   container     = document.createElement('div')
	//  z at 0, add throwaway (1,1,1) point to square it up for inverse
	,   isoTriangle   = $M([[0,0,0,1],[0,1,0,1],[1,0,0,1],[1,1,1,1]])
	,   isoInverse    = isoTriangle.inverse()
	,   tmpDom
	,   tmpTransform
	;

	beef.faces.forEach(function (v, i) {
		tmpDom = document.createElement(domType);
		tmpDom.setAttribute('data-face', i);
		tmpTransform = isoInverse.multiply($M([
			beef.vertices[v[1]].concat(1),
			beef.vertices[v[2]].concat(1),
			beef.vertices[v[3]].concat(1),
			[1,1,1,1]
		]));
		//tmpDom.setAttribute('data-transform', tmpTransform.elements);
		tmpDom.style.webkitTransform = 'matrix3d(' + Array.prototype.concat.apply([],tmpTransform.elements).map(function(v) {return v*10;}).toString() + ')';
		tmpDom.innerHTML = 'a';
		domFaces.push(tmpDom);
		container.appendChild(tmpDom);
	});

	container.style.webkitTransformOrigin = "0 0 0";
	container.style.webkitTransform = 'translate3d(40px, 40px, 40px) rotateX(38deg) rotateZ(30deg)';
	container.style.webKitPerspective = '160px';
	// should I be using document fragments?
	body.appendChild(container);

	window.beef = beef;
});

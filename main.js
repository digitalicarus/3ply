$.get('data/pyramid.ply')
.then(function (raw) {
	var plyObj          = new ply(raw)
	,   body          = document.body
	,   domFaces      = []
	,   domType       = 'tri'
	,   container     = document.createElement('div')
	//  z at 0, add throwaway (1,1,1) point to square it up for inverse
	,   isoTriangle   = $M([[0,0,0,1],[0,1,0,1],[1,0,0,1],[1,1,1,1]])
	,   isoInverse    = isoTriangle.inverse()
	,   tmpDom
	,   tmpTransform
	,   tmpColor
	;

	plyObj.faces.forEach(function (v, i) {
		tmpColor = '#'+Math.floor(Math.random()*16777215).toString(16);
		tmpDom = document.createElement(domType);
		tmpDom.setAttribute('data-face', i);
		console.log(v);
		tmpTransform = isoInverse.multiply($M([
			plyObj.vertices[v[1]].concat(1),
			plyObj.vertices[v[2]].concat(1),
			plyObj.vertices[v[3]].concat(1),
			[1,1,1,1]
		]));
		//tmpDom.setAttribute('data-transform', tmpTransform.elements);
		//tmpDom.style.webkitTransformOrigin = '0 0 0';
		tmpDom.style.borderTop = '20px solid ' + tmpColor;
		tmpDom.style.borderLeft = '20px solid ' + tmpColor;
		tmpDom.style.webkitTransform = 'matrix3d(' + Array.prototype.concat.apply([],tmpTransform.elements).map(function(v) {return v;}).toString() + ')';
		tmpDom.style.webkitTransition = 'transform 2s ease-in';
		tmpDom.innerHTML = 'a';
		domFaces.push(tmpDom);
		container.appendChild(tmpDom);
	});

	container.style.webkitTransform = 'translate3d(200px, 200px, 40px) rotateX(47deg) rotateZ(336deg)';
	container.style.webkitTransformOrigin = '0 0 0';
	container.style.webkitPerspective = '0px';
	// should I be using document fragments?
	body.appendChild(container);

	window.plyObj = plyObj;
});

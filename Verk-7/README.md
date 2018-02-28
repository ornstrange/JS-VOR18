1. Callback er bara fall sem er kallað af öðru falli eða notað af öðru falli.
það er hægt að færa þau á milli og skila þeim eins og venjulegum breytum.

2. EventLoop er aðferð sem leyfir JacaScript að keyra aðra hluti á meðan það er að bíða ákveðnu function að enda.

3. 
	```javascript
	function checkUsername() {
		var target = el.target;
	}
	var el = document.getElementById('username');
	el.addEventListener('blur', checkUsername, false);
	```

4. þetta er boolean sem heitir useCapture. Ef True þá verða events af þessari týpu skráð á hlustandann áður en það fer í EventTarget.

5. a) kemur í veg fyrir fjölgun á event bubbling og capturing
<br>b) ef að event er ekki að virka alveg rétt þá á default lausnin ekki að vera sú sem er vanalega, eventið heldur áfram að fjölgast eins og vanalega.
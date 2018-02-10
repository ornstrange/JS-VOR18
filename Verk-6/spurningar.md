1.  a)  ```javascript
				<style> .active { color: red; } </style>
				<script>
				    gunnar = document.getElementsByTagName('div')[1];
				    gunnar.setAttribute('class', 'active');
				</script>
				```

    b)  ```javascript
    		<script>
			    karen = document.getElementsByTagName('div')[2];
			    karenParent = karen.parentNode;
			    karenParent.removeChild(karen);
				</script>
				```

2.  prentar út linkinn á fyrsta <a> taginu sem hann finnur í skjalinu

3.  sjá [quiz.html](./quiz.html)

4.  "DOM LEVEL 2 EVENT LISTENERS" er nýjasta og er best. Afþví 'event listeners' geta virkjað
    fleiri en eitt fall þegar þeir kveikna ólíkt 'event handler'.

5.  sjá  [Quiz í verkefni 5](../Verk-5)

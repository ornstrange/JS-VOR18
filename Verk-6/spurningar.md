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

2.  prentar �t linkinn � fyrsta <a> taginu sem hann finnur � skjalinu

3.  sj� [quiz.html][./quiz.html]

4.  "DOM LEVEL 2 EVENT LISTENERS" er n�jasta og er best. Af�v� 'event listeners' geta virkja�
    fleiri en eitt fall �egar �eir kveikna �l�kt 'event handler'.

5.  sj� [Quiz � verkefni 5][../Verk-5]

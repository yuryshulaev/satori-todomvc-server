module.exports = content =>
`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Satori • TodoMVC</title>
		<link rel="stylesheet" href="/todomvc-common/base.css">
		<link rel="stylesheet" href="/todomvc-app-css/index.css">
	</head>
	<body>
		<div class="content">${content}</div>
		<footer class="info">
			<p>Double-click to edit a todo</p>
			<p>Created by <a href="https://github.com/yuryshulaev">Yury Shulaev</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
		<script src="/todomvc-common/base.js"></script>
	</body>
</html>`;

JSHINT = ./node_modules/.bin/jshint
TAP = ./node_modules/.bin/tape

lint:
	$(JSHINT) ./lib/*.js

unit:
	$(TAP) ./test/unit/*.js
	$(TAP) ./test/integration/get_auth.js
	$(TAP) ./test/integration/get_ok.js
	$(TAP) ./test/integration/get_stream.js
	$(TAP) ./test/integration/post_err.js

test:
	@make lint
	@make unit

.PHONY: lint unit test
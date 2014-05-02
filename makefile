BROWSERIFY = ./node_modules/.bin/browserify
JSHINT = ./node_modules/.bin/jshint
TAP = ./node_modules/.bin/tape
ZUUL = ./node_modules/.bin/zuul

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
	$(ZUUL) -- test/**/*.js

local:
	$(ZUUL) --local 3000 test/**/*.js

.PHONY: lint unit test local
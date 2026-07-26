# Lychee Landing — common developer commands.
# Run `make` (or `make help`) to list targets.

.DEFAULT_GOAL := help
.PHONY: help install start serve build build-dev watch test clean

help: ## List available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

start: serve ## Start the dev server (alias for serve)

serve: ## Run the app at http://localhost:4200/
	npm start

build: ## Production build → dist/lychee-landing/browser/
	npm run build

build-dev: ## Development build (unoptimized, source maps)
	npx ng build --configuration development

watch: ## Rebuild on change (development configuration)
	npm run watch

test: ## Run unit tests (Karma)
	npm test

clean: ## Remove build output
	rm -rf dist .angular/cache

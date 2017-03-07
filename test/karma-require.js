var testContext = require.context('../test', true, /\.test\.ts/);

/*
 * Here goes "this is kinda Crazy" comment.
 */
function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

// requires and returns all modules that match
var modules = requireAll(testContext);
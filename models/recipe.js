module.exports = (mongoose) => {
	const Recipe = mongoose.model(
		'recipe',
		new mongoose.Schema(
			{
				'@context': 'https://schema.org',
				'@type': 'Recipe',
			},
			{timestamps: true},
		),
	)

	return Recipe
}

const selection = figma.currentPage.selection
if (selection.length > 0 &&
	selection[0].name.includes("Scheme") &&
	selection[0].type === "FRAME") {

		console.log(selection[0])
		selection[0].children.forEach(
			function(eachSwatch) {
				if (eachSwatch.type === "INSTANCE") {
					if (eachSwatch.children[0].type === "ELLIPSE" &&
						eachSwatch.children[1].type === "TEXT") {

						// Parse style from swatch.
						const swatchName = eachSwatch.children[1].characters
						const swatchFills = eachSwatch.children[0].fills as [Paint]
						console.log("swatchName: " + swatchName)
						console.log(eachSwatch.children[0])

						// Get matching style.
						const styles = figma.getLocalPaintStyles()
						console.log(styles)

						const style = styles.find(function(eachStyle) {
							console.log(eachStyle)
							console.log("eachStyle.name: " + eachStyle.name)
							return eachStyle.name == swatchName || eachStyle.name == swatchName.replace(/\s/g, "")
						})
						console.log(style)

						const style_ = figma.getStyleById(style.id) as PaintStyle
						style.name = swatchName
						style.description = "Auto-created from scheme."
						style.paints = swatchFills
					}
				}
			}
		)
}
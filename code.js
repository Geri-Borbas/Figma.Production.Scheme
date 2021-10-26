function run() {
    let selection = figma.currentPage.selection;
    if (selection.length == 0) {
        figma.notify("Select a Scheme first");
        return;
    }
    if (selection[0].name.includes("Scheme") == false ||
        selection[0].type !== "FRAME") {
        figma.notify("Select a valid Scheme");
        return;
    }
    let scheme = selection[0];
    scheme.children.forEach(function (eachSwatch) {
        if (eachSwatch.type !== "INSTANCE") {
            figma.notify("Swatches should be instances");
            return;
        }
        let ellipse = eachSwatch.children[0];
        let text = eachSwatch.children[1];
        if (ellipse.type !== "ELLIPSE" ||
            text.type !== "TEXT") {
            figma.notify("Swatches should contain a text and a circle");
            return;
        }
        // Parse style from swatch.
        let styleName = text.characters;
        let stylePaints = ellipse.fills;
        // Log.
        console.log("styleName: " + styleName);
        console.log(stylePaints);
        // Get matching style if any.
        let styles = figma.getLocalPaintStyles();
        let style = styles.find(eachStyle => eachStyle.name == styleName || eachStyle.name == styleName.replace(/\s/g, ""));
        if (style === undefined) {
            figma.notify("No matching style for `" + styleName + "`");
            return;
        }
        // Apply.
        style.name = styleName;
        style.description = "Auto-created from scheme.";
        style.paints = stylePaints;
    });
}
run();
figma.closePlugin();

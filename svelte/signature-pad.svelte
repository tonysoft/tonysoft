<div class="signature-pad">
    <div class="signature-pad--body" bind:this={container}>
        <canvas bind:this={canvas}></canvas>
    </div>
    <div>
        <div class="signature-pad--actions" bind:this={buttonBar}>
            <div class="signature-pad--action-class" bind:this={clearButtons}>
                <button on:click={clearPad} type="button" class="button clear" data-action="clear">Clear</button>
                <button on:click={undo} type="button" class="button" data-action="undo">Undo</button>
            </div>
            <div class="signature-pad--action-class" bind:this={saveButtons}>
                <button on:click={savePNG} type="button" class="button save" data-action="save-png">Save as PNG</button>
                <button on:click={saveSVG} type="button" class="button save" data-action="save-svg">Save as SVG</button>
            </div>
        </div>
    </div>
</div>

<style>
    .signature-pad {
        position: relative; display: flex; flex-direction: column; width: 100%; height: 100%; background-color: #ddd;
    }
    .signature-pad--body {
        position: relative; flex: 1;
    }
    .signature-pad--body canvas {
        position: absolute; left: 0; top: 0; width: 100%; height: 100%;
    }
    .signature-pad--actions {
        display: none; justify-content: space-between; padding: 8px; border-top: 1px solid #888;
    }
    .signature-pad--action-class {
        display: none;
    }
</style>

<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { SignaturePad } from "./js/signature_pad.js"

    let canvas;
    let container;
    let buttonBar;
    let clearButtons;
    let saveButtons;
    let signaturePad;
    let width;
    let height;
    let minHeight = 120;

    export let download = false;
    export let background = "#ffffff";
    export let pen = "#000000";
    export let minwidth = 0.5;
    export let maxwidth = 2.5;
    export let velocityfilterweight = 0.7;
    export let dotsize = ((maxwidth + minwidth) / 2);
    export let clearbuttons;
    export let savebuttons;

    $: if (clearbuttons !== undefined) {
        let display = checkActionButtons();
        buttonBar.style.display = display;
        clearButtons.style.display = display;
	}

    $: if (savebuttons !== undefined) {
        let display = checkActionButtons();
        buttonBar.style.display = display;
        saveButtons.style.display = display;
	}

    $: if (minwidth !== undefined) {
        minwidth = parseFloat(minwidth) || 0.5;
	}

    $: if (maxwidth !== undefined) {
        maxwidth = parseFloat(maxwidth) || 2.5;
	}

    $: if (velocityfilterweight !== undefined) {
        velocityfilterweight = parseFloat(velocityfilterweight) || 0.7;
	}

    $: if (dotsize !== undefined) {
        dotsize = parseFloat(dotsize) || ((maxwidth + minwidth) / 2);
	}

	const dispatch = createEventDispatcher();
	onMount(() => {
        setTimeout(function() {
            createPad();
        });
		return () => {
		};
	});

    function checkActionButtons() {
        let clear = ((clearbuttons !== undefined) && (clearbuttons !== "false") && (clearbuttons !== false));
        let save = ((savebuttons !== undefined) && (savebuttons !== "false") && (savebuttons !== false));
        return (clear || save) ? "flex" : "none";
    }

    function createPad() {
        var options = { dotSize: dotsize,
                        minWidth: minwidth,
                        maxWidth: maxwidth,
                        velocityFilterWeight: velocityfilterweight,
                        backgroundColor: background,
                        penColor: pen };
        setTimeout(function() {
            resizeCanvas();
            signaturePad = new SignaturePad(canvas, options);

            clearPad();
        }, 100);
    }

    export function getData() {
        var data = signaturePad.getData();
        let payload = data;
        dispatch("pointData", payload);
    }

    export function clearPad() {
        signaturePad.clear();
    }

    export function undo() {
        var data = signaturePad.toData();

        if (data) {
            data.pop(); // remove the last dot or line
            signaturePad.fromData(data); 
        }
    }

    function resizeCanvas() {
        let parentHeight = container.parentNode.offsetHeight;
        if (parentHeight < minHeight) {
            container.parentNode.style.height = minHeight + "px";
        }
        width = container.offsetWidth;
        height = container.offsetHeight;
        var ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
   }

    function downloadSignature(dataURL, filename) {
        if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
            window.open(dataURL);
        } else {
            var blob = dataURLToBlob(dataURL);
            var url = window.URL.createObjectURL(blob);

            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
        }
    }

    function dataURLToBlob(dataURL) {
        // Code taken from https://github.com/ebidel/filer.js
        var parts = dataURL.split(';base64,');
        var contentType = parts[0].split(":")[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

    export function savePNG() {
        if (!signaturePad.isEmpty()) {
            var dataURL = signaturePad.toDataURL();
            if (download !== false) {
                downloadSignature(dataURL, "signature.png");
            }
            let payload = { "dataUri": dataURL, "width": width, "height": height };
            dispatch("signature", payload);
        }
    }

    export function saveSVG() {
        if (!signaturePad.isEmpty()) {
            var dataURL = signaturePad.toDataURL('image/svg+xml');
            if (download !== false) {
                downloadSignature(dataURL, "signature.svg");
            }
            let payload = { "dataUri": dataURL, "width": width, "height": height };
            dispatch("signature", payload);
        }
    }
</script>

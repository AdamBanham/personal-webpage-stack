import {
    append as svgAppend,
    create as svgCreate,
} from 'tiny-svg';

import { ValueEntity } from "../../model/entities";
import { isExactlyValue } from "../../model/util";
import TemplateRenderer from "./templateRenderer";
import RenderingConstants from "../constants";

export const SHAPE_TYPE = "entity";

export default  class ValueEntityRenderer extends TemplateRenderer<ValueEntity> {

    constructor(eventBus:any, renderOptions:any) {
        super(eventBus, renderOptions, SHAPE_TYPE);
    }

    canRender(element:any): element is ValueEntity {
        return isExactlyValue(element);
    }

    shouldRender(element: ValueEntity): element is ValueEntity {
        return true;
    }

    draw(visuals: SVGElement, element: ValueEntity): SVGElement {
        // container for all visuals
        const group = svgCreate("g", {
                class: RenderingConstants.classes.VISUAL_GROUP_CLASS
        });

        // draw constants
        const rx = 10 ;
        const strokeWidth = 3;
        const dashType = "18 6";
        const centerText = Math.floor(element.width * 0.5);
        const textMiddle = (element.height / 2) + 1.25;

        // draw bounding box
        const box = svgCreate("rect", {
            fill: RenderingConstants.css.SHAPE_FILL_COLOUR,
            stroke: RenderingConstants.css.BORDER_COLOUR,
            strokeWidth: strokeWidth,
            'stroke-dasharray': dashType,
            rx: rx,
            width: element.width,
            height: element.height
        });
        svgAppend(group, box);

        // handle text for entity
        const maxTextWidth = Math.floor(element.width * 0.9);
        const maxLetters = Math.floor(maxTextWidth / 6);
        const adjustText = (text:string) => {
            if (!text){
                return "";
            }
            if (text.length > maxLetters){
                const newText = text.substring(0, maxLetters - 1) + "...";
                return newText;
            } else {
                return text;
            }
        };

        let style = "text-align: center;";
        style += `text-anchor: middle;`;
        style += `font-size: 12px;`;

        // draw upper text
        const upperText = svgCreate("text", {
            x: centerText, y: textMiddle,
            fill: RenderingConstants.css.SHAPE_LABEL_COLOUR,
            style: style,
        });
        upperText.textContent = adjustText(element.name);
        svgAppend(group, upperText);

        // add layers to visuals
        svgAppend(visuals, this.createShadowForShape(group));
        svgAppend(visuals, group);

        return visuals;
    }

}
// Copyright (c) 2023 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import styled from 'styled-components';
import {rgb} from 'd3-color';
import ColorLegend from '../common/color-legend';
import {CHANNEL_SCALES, DIMENSIONS} from '@kepler.gl/constants';
import {FormattedMessage} from '@kepler.gl/localization';
import {Layer, LayerBaseConfig, VisualChannel, VisualChannelDescription} from '@kepler.gl/layers';

interface StyledMapControlLegendProps {
  width?: number;
  last?: boolean;
}

export const StyledMapControlLegend = styled.div<StyledMapControlLegendProps>`
  padding: 10px ${props => props.theme.mapControl.padding}px 10px
    ${props => props.theme.mapControl.padding}px;
  font-size: 11px;
  font-family: ${props => props.theme.fontFamily};
  border-bottom-color: ${props => props.theme.panelBorderColor};
  border-bottom-style: solid;
  border-bottom-width: ${props => (props.last ? 0 : '1px')};
  width: ${props => props.width}px;
  box-sizing: border-box;

  .legend--layer_name {
    font-size: 12px;
    padding-right: ${props => props.theme.mapControl.padding}px;
    color: ${props => props.theme.textColor};
    font-weight: 500;
  }
  .legend--layer_type {
    color: ${props => props.theme.subtextColor};
    font-weight: 500;
    font-size: 11px;
    padding-right: ${props => props.theme.mapControl.padding}px;
  }

  .legend--layer__title {
    padding-right: ${props => props.theme.mapControl.padding}px;
  }

  .legend--layer_by {
    color: ${props => props.theme.subtextColor};
  }

  .legend--layer_color_field {
    color: ${props => props.theme.textColorHl};
    font-weight: 500;
  }

  .legend--layer_color-legend {
    margin-top: 6px;
  }
`;

export const VisualChannelMetric = ({name}) => {
  return (
    <div className="legend--layer__title">
      <span className="legend--layer_color_field">
        <FormattedMessage id={name} />
      </span>
    </div>
  );
};

export type LayerSizeLegendProps = {
  label: string;
  name: string | undefined;
};

/** @type {typeof import('./map-legend').LayerSizeLegend} */
export const LayerSizeLegend: React.FC<LayerSizeLegendProps> = ({label, name}) =>
  label ? (
    <div className="legend--layer_size-schema">
      <p>
        <span className="legend--layer_by">{label ? <FormattedMessage id={label} /> : null}</span>
        <span className="legend--layer_by"> by </span>
      </p>
      {name && <VisualChannelMetric name={name} />}
    </div>
  ) : null;

const SINGLE_COLOR_DOMAIN = [''];

export type SingleColorLegendProps = {
  width: number;
  color: string;
};

/** @type {typeof import('./map-legend').SingleColorLegend} */
export const SingleColorLegend: React.FC<SingleColorLegendProps> = React.memo(({width, color}) => (
  <ColorLegend
    scaleType="ordinal"
    displayLabel={false}
    domain={SINGLE_COLOR_DOMAIN}
    fieldType={null}
    range={{colors: [rgb(...color).toString()]}}
    width={width}
  />
));

SingleColorLegend.displayName = 'SingleColorLegend';

export type LayerColorLegendProps = {
  description: VisualChannelDescription;
  config: LayerBaseConfig;
  width: number;
  colorChannel: VisualChannel;
};

/** @type {typeof import('./map-legend').LayerColorLegend} */
export const LayerColorLegend: React.FC<LayerColorLegendProps> = React.memo(
  ({description, config, width, colorChannel}) => {
    const enableColorBy = description.measure;
    const {scale, field, domain, range, property} = colorChannel;
    const [colorScale, colorField, colorDomain] = [scale, field, domain].map(k => config[k]);
    const colorRange = config.visConfig[range];

    return (
      <div>
        <div className="legend--layer_color-schema">
          <div>
            {enableColorBy ? <VisualChannelMetric name={enableColorBy} /> : null}
            <div className="legend--layer_color-legend">
              {enableColorBy ? (
                <ColorLegend
                  scaleType={colorScale}
                  displayLabel
                  domain={colorDomain}
                  fieldType={(colorField && colorField.type) || 'real'}
                  range={colorRange}
                  width={width}
                />
              ) : (
                <SingleColorLegend
                  color={config.visConfig[property] || config[property] || config.color}
                  width={width}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// eslint-disable-next-line react/display-name
LayerColorLegend.displayName = 'LayerColorLegend';

const isColorChannel = visualChannel =>
  [CHANNEL_SCALES.color, CHANNEL_SCALES.colorAggr].includes(visualChannel.channelScaleType);

export type LayerLegendHeaderProps = {
  layer: Layer;
  options?: {
    showLayerName?: boolean;
  };
};

export function LayerLegendHeaderFactory() {
  /** @type {typeof import('./map-legend').LayerLegendHeader }> */
  const LayerLegendHeader: React.FC<LayerLegendHeaderProps> = ({options, layer}) => {
    return options?.showLayerName !== false ? (
      <div className="legend--layer_name">{layer.config.label}</div>
    ) : null;
  };
  return LayerLegendHeader;
}

export type LayerLegendContentProps = {
  layer: Layer;
  containerW: number;
};

export function LayerLegendContentFactory() {
  /** @type {typeof import('./map-legend').LayerLegendContent }> */
  const LayerLegendContent: React.FC<LayerLegendContentProps> = ({layer, containerW}) => {
    const colorChannels = Object.values(layer.visualChannels).filter(isColorChannel);
    const nonColorChannels = Object.values(layer.visualChannels).filter(vc => !isColorChannel(vc));

    return (
      <>
        {colorChannels.map(colorChannel =>
          !colorChannel.condition || colorChannel.condition(layer.config) ? (
            <LayerColorLegend
              key={colorChannel.key}
              description={layer.getVisualChannelDescription(colorChannel.key)}
              config={layer.config}
              width={containerW - 2 * DIMENSIONS.mapControl.padding}
              colorChannel={colorChannel}
            />
          ) : null
        )}
        {nonColorChannels.map(visualChannel => {
          const matchCondition = !visualChannel.condition || visualChannel.condition(layer.config);
          const enabled = layer.config[visualChannel.field] || visualChannel.defaultMeasure;

          const description = layer.getVisualChannelDescription(visualChannel.key);

          return matchCondition && enabled ? (
            <LayerSizeLegend
              key={visualChannel.key}
              label={description.label}
              name={description.measure}
            />
          ) : null;
        })}
      </>
    );
  };

  return LayerLegendContent;
}

export type MapLegendProps = {
  layers?: ReadonlyArray<Layer>;
  width?: number;
  mapHeight?: number;
  options?: {
    showLayerName?: boolean;
  };
};

// EUREKA correlation matrix
export function fill_correlation_matrix(){
  var div = document.getElementById('correlation_matrix');
  if(div!=null)
  {
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
  }
  // Graph dimension
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 200 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom
  
  // Create the svg area
  var svg = d3.select("#correlation_matrix") 
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  //"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_correlogram.csv"
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTPxbD3mtB2_yJmHG1QPeP8BBRS0GObBbcpNHoK0cSYzNYYTOxusPkpbByC-nniD98ywJluK5mYGvK7/pub?output=csv", function(error, rows) {
  
    // Going from wide to long format
    var data = [];
    rows.forEach(function(d) {
      var x = d[""];
      delete d[""];
      for (let prop in d) {
        var y = prop,
          value = d[prop];
        data.push({
          x: x,
          y: y,
          value: +value
        });
      }
    });
  
    // List of all variables and number of them
    var domain = d3.set(data.map(function(d) { return d.x })).values()
  
    // Create a color scale
    var color = d3.scaleLinear()
      .domain([-1, 0, 1])
      .range(["#5f3c96","#de3ad6", "#07a1e3"]);
  
    // Create a size scale for bubbles on top right. Watch out: must be a rootscale!
    var size = d3.scaleSqrt()
      .domain([0, 1])
      .range([0, 9]);
  
    // X scale
    var x = d3.scalePoint()
      .range([0, width])
      .domain(domain)
  
    // Y scale
    var y = d3.scalePoint()
      .range([0, height])
      .domain(domain)
  
    // Create one 'g' element for each cell of the correlogram
    var cor = svg.selectAll(".cor")
      .data(data)
      .enter()
      .append("g")
        .attr("class", "cor")
        .attr("transform", function(d) {
          return "translate(" + x(d.x) + "," + y(d.y) + ")";
        });
  
    // Up right part: add circles
    cor
      .filter(function(d){
        var ypos = domain.indexOf(d.y);
        var xpos = domain.indexOf(d.x);
        return xpos > ypos;
      })
      .append("circle")
        .attr("r", function(d){ return size(Math.abs(d.value)*3) })
        .style("fill", function(d){
          if (d.x === d.y) {
            return "#000";
          } else {
            return color(d.value);
          }
        })
        .style("opacity", 0.8)
  
    // Low left part + Diagonal: Add the text with specific color
    cor
      .filter(function(d){
        var ypos = domain.indexOf(d.y);
        var xpos = domain.indexOf(d.x);
        return xpos <= ypos;
      })
      .append("text")
        .attr("y", 5)
        .attr("x", -15)
        .text(function(d) {
          if (d.x === d.y) {
            return d.x;
          } else {
            return d.value.toFixed(3);
          }
        })
        .style("font-size", 7)
        .style("text-align", "center")
        .style("fill", function(d){
          if (d.x === d.y) {
            return "white";
          } else {
            return color(d.value);
          }
        });
  
  })
  

  };
export function fill_shapley_values(){
  var div = document.getElementById('shapley_values');
  if(div!=null)
  {
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
  }
  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 10, bottom: 40, left: 70},
  width = 200 - margin.left - margin.right,
  height = 200 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#shapley_values")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTGsLez2GFtmky6tTItnozw6egBB7E8vuz9MCs4CgVbBeI1Ug6HoVUcIqaCRihXzeRpYgOUwpkUTPaD/pub?output=csv", function(data) {

  // Add X axis
  var x = d3.scaleLinear()
  .domain([0, 100])
  .range([ 0, width]);
  svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("fill","white");

  // Y axis
  var y = d3.scaleBand()
  .range([ 0, height ])
  .domain(data.map(function(d) { return d.Country; }))
  .padding(.1);
  svg.append("g")
  .call(d3.axisLeft(y))
  .selectAll("text").style("fill","white")

  //Bars
  svg.selectAll("myRect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", x(0) )
  .attr("y", function(d) { return y(d.Country); })
  .attr("width", function(d) { return x(d.Value); })
  .attr("height", y.bandwidth() )
  .attr("fill", "#69b3a2")


  })

};


MapLegendFactory.deps = [LayerLegendHeaderFactory, LayerLegendContentFactory];
function MapLegendFactory(LayerLegendHeader, LayerLegendContent) {
  /** @type {typeof import('./map-legend').MapLegend }> */
  const MapLegend: React.FC<MapLegendProps> = ({layers = [], width, mapHeight, options}) => (
    <div
      className="map-legend"
      {...(mapHeight && {
        style: {
          /* subtracting rough size of 4 map control buttons and padding */
          maxHeight: mapHeight - 250
        }
      })}
    >
      {/* <div id="correlation_matrix">{fill_correlation_matrix}</div>
      <div id="shapley_values">{fill_shapley_values()}</div> */}

      {layers.map((layer, index) => {
        if (!layer.isValidToSave() || layer.config.hidden) {
          return null;
        }
        const containerW = width || DIMENSIONS.mapControl.width;

        return (
          <StyledMapControlLegend
            className="legend--layer"
            last={index === layers.length - 1}
            key={index}
            width={containerW}
          >
            <LayerLegendHeader options={options} layer={layer} />
            <LayerLegendContent containerW={containerW} layer={layer} />
          </StyledMapControlLegend>
        );
      })}
    </div>
  );

  MapLegend.displayName = 'MapLegend';

  return MapLegend;
}

export default MapLegendFactory;

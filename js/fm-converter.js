(function() {
    window.fmCovertXmlReport = function(input) {
        return JSON.stringify(convert(input), null, 2);
    }

    function convert(input) {
        var output = {};
        try {
            var xml = $($.parseXML(input));
            xml = xml.find("config").eq(0);
            if (xml == null || !xml.length) {
                return output;
            }
            convertDataSource(xml, output);
            convertSlice(xml, output);
            convertOptions(xml, output);
            convertFormats(xml, output);
            convertConditions(xml, output);
            convertSizes(xml, output);
            convertCustomFields(xml, output);
            converLocalization(xml, output);
        } catch (e) {
            console.error(e);
            alert(e.toString());
        }
        return output;
    }

    function toBoolean(input) {
        return (input !== undefined && (input.toLowerCase() == "true" || input.toLowerCase() == "on"));
    }

    function convertDataSource(xml, output) {
        var dataSource = xml.find("dataSource");
        if (dataSource.length > 0) {
            output.dataSource = output.dataSource || {};
            var dataSourceType = dataSource.attr("type");
            if (dataSourceType !== undefined) {
                output.dataSource.dataSourceType = dataSourceType.toLowerCase();
            }
            var node = dataSource.find("browseForFile");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.browseForFile = toBoolean(node.text());
            }
            var node = dataSource.find("catalog");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.catalog = node.text();
            }
            var node = dataSource.find("cube");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.cube = node.text();
            }
            var node = dataSource.find("dataSourceInfo");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.dataSourceInfo = node.text();
            }
            var node = dataSource.find("fieldSeparator");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.fieldSeparator = node.text();
            }
            var node = dataSource.find("filename");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.filename = node.text();
            }
            var node = dataSource.find("proxyUrl");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.proxyUrl = node.text();
            }
            var node = dataSource.find("recordsetDelimiter");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.recordsetDelimiter = node.text();
            }
            var node = dataSource.find("embedded");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.embedded = toBoolean(node.text());
            }
            var node = dataSource.find("roles");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.roles = node.text();
            }
            var node = dataSource.find("localeIdentifier");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.localeIdentifier = node.text();
            }
            var node = dataSource.find("effectiveUserName");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.effectiveUserName = node.text();
            }
            var node = dataSource.find("customData");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.customData = node.text();
            }
            var node = dataSource.find("binary");
            if (node.length > 0 && node.text().length > 0) {
                output.dataSource.binary = toBoolean(node.text());
            }
            var credentials = dataSource.find("credentials");
            if (credentials.find("hash").length != 0) {
                output.dataSource.hash = credentials.find("hash").text();
            }
            if (credentials.find("username").length != 0) {
                output.dataSource.username = credentials.find("username").text();
            }
            if (credentials.find("password").length != 0) {
                output.dataSource.password = credentials.find("password").text();
            }
            var params = xml.find("params");
            if (params.find("param[name=ignoreQuotedLineBreaks]").length != 0) {
                output.dataSource.ignoreQuotedLineBreaks = toBoolean(params.find("param[name=ignoreQuotedLineBreaks]").text());
            }
        }
    }

    function convertSlice(xml, output) {
        var slice = xml.find("defaultSlice");
        if (slice.length > 0) {
            output.slice = output.slice || {};
            // row axis
            var axis = xml.find("defaultSlice axes axis[name=rows]");
            if (axis.find("hierarchy").length > 0) {
                output.slice.rows = hierarchiesFromXML(axis.find("hierarchy"));
            }
            if (axis.find("sort").length > 0) {
                output.slice.rowSorting = sortingFromXML(axis.find("sort"));
            }
            if (axis.find("expanded tuple").length > 0) {
                output.slice.expandedRows = expandedFromXML(axis.find("expanded tuple"));
            }
            if (axis.find("drilled tuple").length > 0) {
                output.slice.drilledRows = drilledFromXML(axis.find("drilled tuple"));
            }
            // column axis
            var axis = xml.find("defaultSlice axes axis[name=columns]");
            if (axis.find("hierarchy").length > 0) {
                output.slice.columns = hierarchiesFromXML(axis.find("hierarchy"));
            }
            if (axis.find("sort").length > 0) {
                output.slice.columnSorting = sortingFromXML(axis.find("sort"));
            }
            if (axis.find("expanded tuple").length > 0) {
                output.slice.expandedColumns = expandedFromXML(axis.find("expanded tuple"));
            }
            if (axis.find("drilled tuple").length > 0) {
                output.slice.drilledColumns = drilledFromXML(axis.find("drilled tuple"));
            }
            // pages axis & measures
            var axis = xml.find("defaultSlice axes axis[name=pages]");
            if (axis.find("hierarchy").length > 0) {
                output.slice.pages = hierarchiesFromXML(axis.find("hierarchy"));
            }
            if (xml.find("defaultSlice measures measure").length > 0) {
                output.slice.measures = measuresFromXML(xml.find("defaultSlice measures measure"));
            }
            if (xml.find("defaultSlice flatOrder hierarchyName").length > 0) {
                output.slice.flatOrder = flatOrderFromXML(xml.find("defaultSlice flatOrder hierarchyName"));
            }
            // other
            var props = xml.find("defaultSlice properties level");
            if (props.length > 0) {
                output.slice.memberProperties = memberPropertiesFromXML(props);
            }
            var prefilter = xml.find("defaultSlice prefilter hierarchy");
            if (prefilter.length > 0) {
                output.slice.prefilter = prefilterFromXML(prefilter);
            }
            //backward compatibility
            var params = xml.find("params");
            if (params.find("param[name=expandAll]").length != 0) {
                output.slice.expandAll = toBoolean(params.find("param[name=expandAll]").text());
            }
            if (params.find("param[name=drillAll]").length != 0) {
                output.slice.drillAll = toBoolean(params.find("param[name=drillAll]").text());
            }
            if (params.find("param[name=useOlapFormatting]").length != 0) {
                output.slice.useOlapFormatting = toBoolean(params.find("param[name=useOlapFormatting]").text());
            }
            if (slice.find("expandAll").length != 0) {
                output.slice.expandAll = toBoolean(slice.find("expandAll").text());
            }
            if (slice.find("drillAll").length != 0) {
                output.slice.drillAll = toBoolean(slice.find("drillAll").text());
            }
            if (slice.find("useOlapFormatting").length != 0) {
                output.slice.useOlapFormatting = toBoolean(slice.find("useOlapFormatting").text());
            }
        }
    }

    function hierarchiesFromXML(hierarchies) {
        var output = [];
        for (var i = 0; i < hierarchies.length; i++) {
            var hierarchy = hierarchyFromXML(hierarchies.eq(i));
            output.push(hierarchy);
        }
        return output;
    }

    function hierarchyFromXML(xml) {
        var hierarchy = {};
        hierarchy["dimensionName"] = xml.find("dimensionName").text().trim();
        hierarchy["uniqueName"] = xml.find("hierarchyName").text().trim();
        var levelName = xml.find("levelName");
        if (levelName.length > 0) {
            hierarchy["activeLevelName"] = xml.find("levelName").text().trim();
        }
        if (xml.attr("sort") !== undefined) {
            hierarchy["sortName"] = xml.attr("sort");
        }
        if (xml.attr("sortAs") !== undefined) {
            hierarchy["sortAs"] = xml.attr("sortAs");
        }
        var filter = xml.find("filter");
        if (filter.length > 0) {
            var filterMembers = [];
            var members = filter.find("member");
            for (var i = 0; i < members.length; i++) {
                var _name = $(members[i]).text().trim();
                filterMembers.push(_name);
            }
            var filterNegation = (filter.attr("negation") !== undefined) ? toBoolean(filter.attr("negation")) : false;
            var filterType = (filter.attr("type") !== undefined) ? filter.attr("type") : "none";
            var filterQuantity = (filter.attr("quantity") !== undefined) ? parseInt(filter.attr("quantity")) : -1;
            var filterMeasure = (filter.attr("measure") !== undefined) ? filter.attr("measure") : "";
            if (filterType != "none" || filterMembers.length > 0) {
                hierarchy["filter"] = {};
            }
            if (filterMembers.length > 0) {
                hierarchy["filter"]["members"] = filterMembers;
                hierarchy["filter"]["negation"] = filterNegation;
            }
            if (filterType != "none") {
                hierarchy["filter"]["type"] = filterType;
                hierarchy["filter"]["quantity"] = filterQuantity;
                hierarchy["filter"]["measure"] = filterMeasure;
            }
        }

        var properties = filter.find("properties");
        if (properties.length > 0) {
            var props = properties.find("property");
            hierarchy["predefinedProperties"] = [];
            for (var i = 0; i < props.length; i++) {
                var propName = $(props[i]).find("propertyName").text();
                var lName = $(props[i]).find("levelName").text();
                if (hierarchy["predefinedProperties"][lName] == null) {
                    hierarchy["predefinedProperties"][lName] = [];
                }
                hierarchy["predefinedProperties"][lName].push(propName);
            }
        }

        var members = xml.find("sort member");
        if (members.length > 0) {
            var customSorting = [];
            for (var i = 0; i < members.length; i++) {
                customSorting.push($(members[i]).text());
            }
            hierarchy["customSorting"] = customSorting;
        }

        if (xml.attr("filterEnabled") !== undefined) {
            hierarchy["filterEnabled"] = (xml.attr("filterEnabled") != "false");
        }

        var groupsXML = xml.find("group");
        if (groupsXML.length > 0) {
            var groups = {};
            for (var i = 0; i < groupsXML.length; i++) {
                var name = groupsXML.eq(i).attr("name")
                groups[name] = [];
                var membersXML = groupsXML.eq(i).find("member");
                for (var j = 0; j < membersXML.length; j++) {
                    groups[name].push(membersXML.eq(j).text());
                }
            }
            hierarchy["groups"] = groups;
        }

        return hierarchy;
    }

    function sortingFromXML(sorting) {
        var output = {};
        if (sorting.length > 0) {
            output["type"] = sorting.text();
            output["tuple"] = sorting.attr("tuple").split(",");
            output["measure"] = sorting.attr("measure");
        }
        return output;
    }

    function expandedFromXML(expandedTuples) {
        var output = [];
        var measureIdx;
        var measureUniqueName;
        if (expandedTuples.length > 0) {
            for (var i = 0; i < expandedTuples.length; i++) {
                var tupleXML = expandedTuples.eq(i);
                var tuple = tupleXML.text().split(",");
                if (isNaN(parseInt(tuple[0]))) { //new - based on unique names
                    measureUniqueName = (tupleXML.attr("measure") !== undefined) ? tupleXML.attr("measure") : "";
                    tuple.unshift(measureUniqueName);
                } else { //backward compatibility - based on idx
                    measureIdx = (tupleXML.attr("measure") !== undefined) ? parseInt(tupleXML.attr("measure")) : -1;
                    if (isNaN(measureIdx)) measureIdx = -1;
                    tuple.unshift(measureIdx);
                }
                output.push(tuple);
            }
        }
        return output;
    }

    function drilledFromXML(drilledTuples) {
        var output = [];
        if (drilledTuples.length > 0) {
            for (var i = 0; i < drilledTuples.length; i++) {
                var tupleXML = $(drilledTuples[i]);
                var tuple = toIntArray(tupleXML.text().split(","));
                var measureIdx = (tupleXML.attr("measure") !== undefined) ? parseInt(tupleXML.attr("measure")) : -1;

                var member = -1;
                if (tupleXML.attr("memberName") !== undefined) {
                    member = tupleXML.attr("memberName");
                } else if (tupleXML.attr("member") !== undefined) {
                    member = parseInt(tupleXML.attr("member"));
                }
                tuple.unshift(member);
                tuple.unshift(measureIdx);
                if (tupleXML.attr("levelName") !== undefined) {
                    var levelName = tupleXML.attr("levelName");
                    tuple.unshift(levelName);
                }
                output.push(tuple);
            }
        }
        return output;
    }

    function toIntArray(input) {
        for (var i = 0; i < input.length; i++) {
            input[i] = parseInt(input[i]);
        }
        return input;
    }

    function measuresFromXML(measures) {
        var output = [];
        for (var i = 0; i < measures.length; i++) {
            var measure = measureFromXML(measures.eq(i));
            output.push(measure);
        }
        return output;
    }

    function measureFromXML(measure) {
        var output = {};
        output["uniqueName"] = measure.text().trim();
        if (measure.attr("calculated") !== undefined && measure.text().length > 0) {
            output["uniqueName"] = measure.attr("uniqueName");
            output["formula"] = measure.text();
            output["individual"] = (measure.attr("individual") !== undefined) ? toBoolean(measure.attr("individual")) : false;
        }
        if (measure.attr("availableAggregations") !== undefined) {
            output["availableAggregations"] = measure.attr("availableAggregations").split(",");
        }
        if (measure.attr("aggregation") !== undefined) {
            output["aggregation"] = measure.attr("aggregation");
        }
        if (measure.attr("caption") !== undefined) {
            output["caption"] = measure.attr("caption");
        }
        if (measure.attr("grandTotalCaption") !== undefined) {
            output["grandTotalCaption"] = measure.attr("grandTotalCaption");
        }
        if (measure.attr("format") !== undefined) {
            output["format"] = measure.attr("format");
        }
        output["active"] = (measure.attr("active") !== undefined) ? toBoolean(measure.attr("active")) : true;
        return output;
    }

    function flatOrderFromXML(flatOrder) {
        var output = [];
        for (var i = 0; i < flatOrder.length; i++) {
            output.push(flatOrder.eq(i).text());
        }
        return output;
    }

    function prefilterFromXML(hierarchies) {
        var output = {};
        for (var i = 0; i < hierarchies.length; i++) {
            var hierarchyName = hierarchies.eq(i).find("hierarchyName").text();
            var members = [];
            for (var j = 0; j < hierarchies.eq(i).find("member").length; j++) {
                members.push(hierarchies.eq(i).find("member").eq(j).text());
            }
            output[hierarchyName] = members;
        }
        return output;
    }

    function convertOptionsGrid(xml, options) {
        options.grid = options.grid || {};
        var params = xml.find("params");
        if (params.find("param[name=classicView]").length != 0 && toBoolean(params.find("param[name=classicView]").text())) {
            options.grid.type = "classic";
        }
        if (params.find("dataSource[name=tableType]") === "flat") { // backward compatibility
            options.grid.type = "flat";
        }
        if (params.find("param[name=flatView]").length != 0 && toBoolean(params.find("param[name=flatView]").text())) {
            options.grid.type = "flat";
        }
        if (params.find("param[name=gridTitle]").length != 0) {
            options.grid.title = params.find("param[name=gridTitle]").text();
        }
        if (params.find("param[name=showFilter]").length != 0) {
            options.grid.showFilter = toBoolean(params.find("param[name=showFilter]").text());
        }
        if (params.find("param[name=showHeaders]").length != 0) {
            options.grid.showHeaders = toBoolean(params.find("param[name=showHeaders]").text());
        }
        if (params.find("param[name=fitGridlines]").length != 0) {
            options.grid.fitGridlines = toBoolean(params.find("param[name=fitGridlines]").text());
        }
        if (params.find("param[name=showTotals]").length != 0) {
            options.grid.showTotals = toBoolean(params.find("param[name=showTotals]").text());
        }
        if (params.find("param[name=showGrandTotals]").length != 0) {
            options.grid.showGrandTotals = params.find("param[name=showGrandTotals]").text();
        }
        if (params.find("param[name=showExtraTotalLabels]").length != 0) {
            options.grid.showExtraTotalLabels = toBoolean(params.find("param[name=showExtraTotalLabels]").text());
        }
        if (params.find("param[name=showHierarchies]").length != 0) {
            options.grid.showHierarchies = toBoolean(params.find("param[name=showHierarchies]").text());
        }
        if (params.find("param[name=showHierarchyCaptions]").length != 0) {
            options.grid.showHierarchyCaptions = toBoolean(params.find("param[name=showHierarchyCaptions]").text());
        }
        if (params.find("param[name=showReportFiltersArea]").length != 0) {
            options.grid.showReportFiltersArea = toBoolean(params.find("param[name=showReportFiltersArea]").text());
        }
        if (params.find("param[name=pagesFilterLayout]").length != 0) {
            options.grid.pagesFilterLayout = params.find("param[name=pagesFilterLayout]").text().toLowerCase();
        }
    }

    function convertOptionsChart(xml, options) {
        options.chart = options.chart || {};
        var params = xml.find("params");
        var chartTypeXML = params.find("param[name=chartType]");
        if (chartTypeXML.length != 0) {
            options.chart.type = chartTypeXML.text();
        }
        if (params.find("param[name=chartTitle]").length != 0) {
            options.chart.title = params.find("param[name=chartTitle]").text();
        }
        if (params.find("param[name=showFilterInCharts]").length != 0) {
            options.chart.showFilter = toBoolean(params.find("param[name=showFilterInCharts]").text());
        }
        if (chartTypeXML.attr("labelsHierarchy") !== undefined) {
            options.chart.labelsHierarchy = chartTypeXML.attr("labelsHierarchy");
        }
        if (params.find("param[name=chartMultipleMeasures]").length != 0) {
            options.chart.multipleMeasures = toBoolean(params.find("param[name=chartMultipleMeasures]").text());
        }
        if (params.find("param[name=chartOneLevel]").length != 0) {
            options.chart.oneLevel = toBoolean(params.find("param[name=chartOneLevel]").text());
        }
        if (params.find("param[name=chartAutoRange]").length != 0) {
            options.chart.autoRange = toBoolean(params.find("param[name=chartAutoRange]").text());
        }
        if (params.find("param[name=chartReversedAxes]").length != 0) {
            options.chart.reversedAxes = toBoolean(params.find("param[name=chartReversedAxes]").text());
        }
        if (params.find("param[name=showChartLegendButton]").length != 0) {
            options.chart.showLegendButton = toBoolean(params.find("param[name=showChartLegendButton]").text());
        }
        if (params.find("param[name=showAllChartLabels]").length != 0) {
            options.chart.showAllLabels = toBoolean(params.find("param[name=showAllChartLabels]").text());
        }
        if (params.find("param[name=showChartMeasures]").length != 0) {
            options.chart.showMeasures = toBoolean(params.find("param[name=showChartMeasures]").text());
        }
        if (params.find("param[name=showChartOneMeasureSelection]").length != 0) {
            options.chart.showOneMeasureSelection = toBoolean(params.find("param[name=showChartOneMeasureSelection]").text());
        }
        if (params.find("param[name=showChartsWarning]").length != 0) {
            options.chart.showWarning = toBoolean(params.find("param[name=showChartsWarning]").text());
        }
        if (chartTypeXML.attr("position") !== undefined) {
            options.chart.position = chartTypeXML.attr("position");
        }
        if (chartTypeXML.attr("pieDataIndex") !== undefined) {
            options.chart.pieDataIndex = parseInt(chartTypeXML.attr("pieDataIndex"));
        }
        if (chartTypeXML.attr("activeMeasure") !== undefined) {
            options.chart.activeMeasure = chartTypeXML.attr("activeMeasure");
        }
        if (chartTypeXML.attr("chartOneLevelTuple") !== undefined) {
            options.chart.oneLevelTuple = chartTypeXML.attr("chartOneLevelTuple");
        }
    }

    function convertOptions(xml, output) {
        var params = xml.find("params");
        if (params.length > 0) {
            output.options = output.options || {};
            convertOptionsGrid(xml, output.options);
            convertOptionsChart(xml, output.options);
            var options = output.options;
            if (params.find("param[name=viewType]").length != 0) {
                options.viewType = params.find("param[name=viewType]").text();
            }
            if (params.find("param[name=configuratorActive]").length != 0) {
                options.configuratorActive = toBoolean(params.find("param[name=configuratorActive]").text());
            }
            if (params.find("param[name=configuratorButton]").length != 0) {
                options.configuratorButton = toBoolean(params.find("param[name=configuratorButton]").text());
            }
            if (params.find("param[name=configuratorMatchHeight]").length != 0) {
                options.configuratorMatchHeight = toBoolean(params.find("param[name=configuratorMatchHeight]").text());
            }
            if (params.find("param[name=showAggregations]").length != 0) {
                options.showAggregations = toBoolean(params.find("param[name=showAggregations]").text());
            }
            if (params.find("param[name=showCalculatedValuesButton]").length != 0) {
                options.showCalculatedValuesButton = toBoolean(params.find("param[name=showCalculatedValuesButton]").text());
            }
            if (params.find("param[name=editing]").length != 0) {
                options.editing = toBoolean(params.find("param[name=editing]").text());
            }
            if (params.find("param[name=drillThrough]").length != 0) {
                options.drillThrough = toBoolean(params.find("param[name=drillThrough]").text());
            }
            if (params.find("param[name=showDrillThroughConfigurator]").length != 0) {
                options.showDrillThroughConfigurator = toBoolean(params.find("param[name=showDrillThroughConfigurator]").text());
            }
            if (params.find("param[name=sorting]").length != 0) {
                options.sorting = params.find("param[name=sorting]").text();
            }
            if (params.find("param[name=datePattern]").length != 0) {
                options.datePattern = params.find("param[name=datePattern]").text();
            }
            if (params.find("param[name=dateTimePattern]").length != 0) {
                options.dateTimePattern = params.find("param[name=dateTimePattern]").text();
            }
            if (params.find("param[name=saveAllFormats]").length != 0) {
                options.saveAllFormats = toBoolean(params.find("param[name=saveAllFormats]").text());
            }
            if (params.find("param[name=showDefaultSlice]").length != 0) {
                options.showDefaultSlice = toBoolean(params.find("param[name=showDefaultSlice]").text());
            }
            if (params.find("param[name=showEmptyData]").length != 0) {
                options.showEmptyData = toBoolean(params.find("param[name=showEmptyData]").text());
            }
            if (params.find("param[name=defaultHierarchySortName]").length != 0) {
                options.defaultHierarchySortName = params.find("param[name=defaultHierarchySortName]").text();
            }
            if (params.find("param[name=selectEmptyCells]").length != 0) {
                options.selectEmptyCells = toBoolean(params.find("param[name=selectEmptyCells]").text());
            }
            if (params.find("param[name=modernTheme]").length != 0 && toBoolean(params.find("param[name=modernTheme]").text())) {
                options.modernTheme = toBoolean(params.find("param[name=modernTheme]").text());
            }
            if (params.find("param[name=calculatedValuesOLAP]").length != 0 && toBoolean(params.find("param[name=calculatedValuesOLAP]").text())) {
                options.calculatedValuesOLAP = toBoolean(params.find("param[name=calculatedValuesOLAP]").text());
            }
            if (params.find("param[name=showOutdatedDataAlert]").length != 0) {
                options.showOutdatedDataAlert = toBoolean(params.find("param[name=showOutdatedDataAlert]").text());
            }
            if (params.find("param[name=showMemberProperties]").length != 0) {
                options.showMemberProperties = toBoolean(params.find("param[name=showMemberProperties]").text());
            }
        }
    }

    function convertFormats(xml, output) {
        var formats = xml.find("format");
        if (formats.length > 0) {
            output.formats = output.formats || [];
            for (var i = 0; i < formats.length; i++) {
                var format = formatFromXML(formats.eq(i));
                output.formats.push(format);
            }
        }
    }

    function formatFromXML(format) {
        var output = {};
        if (format.attr("name") !== undefined) {
            output["name"] = format.attr("name");
        }
        if (format.find("param[name=thousandsSeparator]").length != 0) {
            output["thousandsSeparator"] = format.find("param[name=thousandsSeparator]").text();
        }
        if (format.find("param[name=decimalSeparator]").length != 0) {
            output["decimalSeparator"] = format.find("param[name=decimalSeparator]").text();
        }
        if (format.find("param[name=decimalPlaces]").length != 0) {
            output["decimalPlaces"] = parseInt(format.find("param[name=decimalPlaces]").text());
        }
        if (format.find("param[name=maxDecimalPlaces]").length != 0) {
            output["maxDecimalPlaces"] = parseInt(format.find("param[name=maxDecimalPlaces]").text());
        }
        if (format.find("param[name=maxSymbols]").length != 0) {
            output["maxSymbols"] = parseInt(format.find("param[name=maxSymbols]").text());
        }
        if (format.find("param[name=currencySymbol]").length != 0) {
            output["currencySymbol"] = format.find("param[name=currencySymbol]").text();
        }
        if (format.find("param[name=currencySymbolAlign]").length != 0) {
            output["currencySymbolAlign"] = format.find("param[name=currencySymbolAlign]").text();
        }
        if (format.find("param[name=nullValue]").length != 0) {
            output["nullValue"] = format.find("param[name=nullValue]").text();
        }
        if (format.find("param[name=infinityValue]").length != 0) {
            output["infinityValue"] = format.find("param[name=infinityValue]").text();
        }
        if (format.find("param[name=divideByZeroValue]").length != 0) {
            output["divideByZeroValue"] = format.find("param[name=divideByZeroValue]").text();
        }
        if (format.find("param[name=textAlign]").length != 0) {
            output["textAlign"] = format.find("param[name=textAlign]").text();
        }
        if (format.find("param[name=isPercent]").length != 0) {
            output["isPercent"] = toBoolean(format.find("param[name=isPercent]").text());
        }
        return output;
    }

    function convertConditions(xml, output) {
        var conditions = xml.find("conditions condition");
        if (conditions.length > 0) {
            output.conditions = output.conditions || [];
            for (var i = 0; i < conditions.length; i++) {
                var condition = conditionFromXML(conditions.eq(i));
                output.conditions.push(condition);
            }
        }
    }

    function conditionFromXML(condition) {
        var output = {};
        for (var i = 0; i < condition.contents().length; i++) {
            if (condition.contents()[i].textContent.trim().length > 0) {
                output["formula"] = condition.contents()[i].textContent.trim();
                break;
            }
        }
        if (condition.attr("id") !== undefined) {
            output["id"] = condition.attr("id");
        }
        if (condition.attr("hierarchy") !== undefined) {
            output["hierarchy"] = condition.attr("hierarchy");
        }
        if (condition.attr("measure") !== undefined) {
            output["measure"] = condition.attr("measure");
        }
        if (condition.attr("member") !== undefined) {
            output["member"] = condition.attr("member");
        }
        if (condition.attr("row") !== undefined) {
            output["row"] = condition.attr("row");
        }
        if (condition.attr("column") !== undefined) {
            output["column"] = condition.attr("column");
        }
        if (condition.attr("isTotal") !== undefined) {
            output["isTotal"] = utils.StringUtils.toBoolean(condition.attr("isTotal"));
        }
        if (condition.find("trueStyle").length != 0) {
            try {
                output["trueStyle"] = JSON.parse(condition.find("trueStyle").text());
            } catch (e) {
                output["trueStyle"] = condition.find("trueStyle").text();
            }
        }
        if (condition.find("falseStyle").length != 0) {
            try {
                output["falseStyle"] = JSON.parse(condition.find("falseStyle").text());
            } catch (e) {
                output["falseStyle"] = condition.find("falseStyle").text();
            }
        }
        return output;
    }

    function convertSizes(xml, output) {
        var rows = xml.find("view row");
        if (rows.length > 0) {
            output.tableSizes = output.tableSizes || {};
            output.tableSizes.rows = output.tableSizes.rows || [];
            for (var i = 0; i < rows.length; i++) {
                var row = rows.eq(i);
                if (row.attr("headerIdx") !== undefined) {
                    output.tableSizes.rows.push({
                        "idx": parseInt(row.attr("headerIdx")),
                        "height": parseInt(row.text())
                    });
                } else {
                    var tuple = row.text().split(",");
                    var height = parseInt(tuple.pop());
                    output.tableSizes.rows.push({
                        "tuple": tuple,
                        "height": height
                    });
                }
            }
        }
        var columns = xml.find("view column");
        if (columns.length > 0) {
            output.tableSizes = output.tableSizes || {};
            output.tableSizes.columns = output.tableSizes.columns || [];
            for (var i = 0; i < columns.length; i++) {
                var column = columns.eq(i);
                if (column.attr("headerIdx") !== undefined) {
                    output.tableSizes.columns.push({
                        "idx": parseInt(column.attr("headerIdx")),
                        "width": parseInt(column.text())
                    });
                } else {
                    var tuple = column.text().split(",");
                    var width = parseInt(tuple.pop());
                    output.tableSizes.columns.push({
                        "tuple": tuple,
                        "width": width
                    });
                }
            }
        }
    }

    function convertCustomFields(xml, output) {
        var fields = xml.find("customFields").children();
        if (fields.length > 0) {
            output.customFields = [];
            for (var i = 0; i < fields.length; i++) {
                var field = {};
                field["name"] = fields.eq(i).attr("name");
                field["value"] = fields.eq(i).attr("value");
                output.customFields.push(field);
            }
        }
    }

    function converLocalization(xml, output) {
        if (xml.find("param[name=localSettingsUrl]").length != 0) { // backward compatibility
            output.localization = xml.find("param[name=localSettingsUrl]").text();
        }
        if (xml.find("param[name=localization]").length != 0) {
            output.localization = xml.find("param[name=localization]").text();
        }
    }
})();

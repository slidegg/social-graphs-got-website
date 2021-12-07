jQuery(function ($) {
    $(document).ready(function () {
        console.log("load", "true");
        d3.selection.prototype.moveToFront = function () {
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };
        d3.selection.prototype.moveToBack = function () {
            return this.each(function () {
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                    this.parentNode.insertBefore(this, firstChild);
                }
            });
        };

        var screen = $("body").width();
        var ttip = d3.select("body").append("div").attr("class", "ttip");
        var charIcon = [];
        var nodeLimit = 100;
        var maxLink = 10;
        var minLink = 1;
        var maxNode = 40;
        var minNode = 1;
        interaction = "Hover over a character to highlight their relationships. Click to filter. Drag to reposition."

        if (screen > 1366) {
            nodeLimit = 100;
            maxLink = 30;
            maxNode = 40;
            interaction = "Hover over a character to highlight their relationships. Click to filter. Drag to reposition."
        } else if (screen > 1024 && screen <= 1366) {
            nodeLimit = 40;
            maxLink = 20;
            maxNode = 40;

        } else if (screen > 640 && screen <= 1024) {
            nodeLimit = 40;
            maxLink = 8;
            maxNode = 40;
            interaction = "Click a character to highlight their relationships. Double click to filter. Drag to reposition."

        } else if (screen <= 640) {
            nodeLimit = 25;
            maxLink = 8;
            minLink = .3;
            maxNode = 35;
            minNode = 10;
            interaction = "Click a character to highlight their relationships. Double click to filter. Drag to reposition."
        }


        var thisCharacter = "Samwell Tarly";

        var nodeExtent, linkExtent;

        var plot_container = d3.select("#container")
            .append("div")
            .attr("class", "plot-container")


        var plot = plot_container
            .append("div")
            .attr("class", "plot")
        var caption = plot_container.append("div").attr("class", "plot-caption")
        var legend_container = caption.append("div")
            .attr("class", "legend-container")


        var legend = legend_container
            .append("div")
            .attr("class", "legend")


        var info = caption.append("div").attr("class", "plot-caption-inner");

        var captionTitle = info.append("div").attr("class", "h3 bold").html("About the data<br>")

        var direction1 = info.append("div")
            .attr("class", "p")
            .html("Each representation/filtered result/query depicts a maximum of 100 top characters, ranked by the amount of time on screen they receive. Data is normalized for each query, scaling circles and links relatively.")

        var direction2 = info.append("div")
            .attr("class", "p")
            .html("Data for this project is provided by <a href='https://medium.com/@jeffrey.lancaster/the-ultimate-game-of-thrones-dataset-a100c0cf35fb' target='_blank'>Jeffery Lancaster</a>.")
        info.append("div").attr("class", "h3 bold").html("Want more?")

        info.append("div").attr("class", "p").html("See where your favorite characters have been spending their season in this interactive visualization <a href='https://news.northeastern.edu/2017/07/westeros-and-beyond/' target='_blank'>Westeros and Beyond</a>.")


        var m = {t: 50, l: 5, b: 40, r: 40},
            width = d3.select(".plot").node().clientWidth - m.l - m.r,
            height = d3.select(".plot").node().clientHeight - m.t - m.b;


        var charToHouse2 = d3.map();
        var charToImage = d3.map();
        var colorMap = d3.map();
        var mainCharacterNest;

        plot.append("div").attr("id", "interaction").attr("class", "h3 bold").html(interaction);
        plot.append("div").html("deselect character").attr("id", "deselect").attr("class", "h4 btn");
        var svg = plot.append("svg")
            .attr("width", width + m.l + m.r)
            .attr("height", height + m.t + m.b)
            .append("g")
            .attr("transform", "translate(" + m.l + "," + m.t + ")");


        queue()
            .defer(d3.json, isSecure() + "://news.northeastern.edu/interactive/2017/westeros-and-beyond/data/characters.json")
            .defer(d3.json, isSecure() + "://news.northeastern.edu/interactive/2017/westeros-and-beyond/data/characters-houses.json")
            .defer(d3.json, isSecure() + "://news.northeastern.edu/interactive/2017/westeros-and-beyond/data/episodes.json")
            .defer(d3.csv, isSecure() + "://news.northeastern.edu/interactive/2017/08/got-season-7/data/characters-images.csv", parseImages)
            .defer(d3.csv, isSecure() + "://news.northeastern.edu/interactive/2017/08/got-season-7/data/house-color.csv", parseColor)
            .await(dataLoaded)


        function isSecure() {
            if (location.protocol == 'https:') {
                return 'https';
            } else {
                return 'http';
            }
        }

        var charToHouse = d3.map();

        function parseImages(d) {
            return {
                image: d.image,
                character: d.character
            }
        }

        function parseColor(d) {
            return {
                house: d.house,
                color: d.color
            }
        }

        var cf_data;
        var dispatch = d3.dispatch('changedata');
        var dispatch2 = d3.dispatch('nodehover')
        var dispatch3 = d3.dispatch('househover')

        function dataLoaded(err, characters_, character_houses, episodes, images, colors) {

            var characters = characters_.characters;
            var episodes_raw = episodes.episodes;
            var characterHouses = character_houses.house;

            makeCharacterToHouseMap(characters, characterHouses)

            var sceneArray = [];
            var i = 1;

            images.forEach(function (d) {
                charToImage.set(d.character, d.image)
            })

            colors.forEach(function (d) {
                colorMap.set(d.house, d.color)
            })
            var allCharactersByScene = [];

            episodes_raw.forEach(function (d) {
                var episodeNumFull = i++;
                d.episodeNumFull = episodeNumFull;
                var scenes = d.scenes;
                scenes.forEach(function (e) {
                    a = e.sceneStart.split(':');
                    b = e.sceneEnd.split(':');
                    sceneStart = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
                    sceneEnd = (+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]);
                    e.sceneStart = sceneStart;
                    e.sceneEnd = sceneEnd;
                    var difference = function (a, b) {
                        return Math.abs(a - b);
                    }
                    var duration = difference(e.sceneStart, e.sceneEnd)
                    e.duration = duration / 60;

                    var characterAr = [];
                    var characters = e.characters;
                    characters.forEach(function (f) {
                        characterAr.push(f.name)
                        allCharactersByScene.push({character: f.name, duration: e.duration})
                    })
                    e.episodeNum = d.episodeNum;
                    e.episodeNumFull = d.episodeNumFull;
                    e.characters = characterAr;
                    sceneArray.push({
                        duration: e.duration,
                        episodeNumFull: e.episodeNumFull,
                        episodeNum: e.episodeNum,
                        characters: e.characters,
                        location: e.location,
                        sceneStart: e.sceneStart,
                        sceneEnd: e.sceneEnd,
                        seasonNum: d.seasonNum
                    })
                })
            })

            mainCharacterNest = d3.nest()
                .key(function (d) {
                    return d.character
                })
                .entries(allCharactersByScene)

            mainCharacterNest.forEach(function (d) {
                var values = d.values;
                var duration = [];
                values.forEach(function (e) {
                    duration.push(e.duration);
                })
                d.duration = d3.sum(duration)
            })

            mainCharacterNest.sort(function (a, b) {
                return d3.descending(a.duration, b.duration)
            })


            parseNetwork(sceneArray)
            houseLegend(colors)
        }

        function makeCharacterToHouseMap(characters, characterHouses) {

            var newCharacterArray1 = [];

            var characterHouses_p1 = characterHouses.filter(function (d) {
                return d.name != "Include"
            })
            characterHouses_p1.forEach(function (d) {
                var house = d.name;
                var characters = d.characters;
                characters.forEach(function (e) {
                    newCharacterArray1.push({characterName: e, houseName: d.name})
                })
            })

            // this is an object with array inside with list of characters who need to be better defined
            var fcharacterHouses = characterHouses.filter(function (d) {
                return d.name == "Include"
            })

            var characterListToFill;
            fcharacterHouses.forEach(function (d) {
                characterListToFill = d.characters;
            })

// we dont care about undefined...we want to use this map to fill in characters who are called included
            characters.forEach(function (d) {
                var house = d.houseName;
                if (house != undefined) {
                    if (Array.isArray(house)) {
                        house = house[0]
                    }
                    charToHouse2.set(d.characterName, house)
                }
                d.houseName = house;
            })

            var fcharacters = characters.filter(function (d) {
                return d.houseName != undefined;
            })

            var newCharacterArray2 = fcharacters.filter(function (d) {
                return characterListToFill.includes(d.characterName);
            })

            var newCharacterArray2_ = [];

            newCharacterArray2.forEach(function (d) {
                newCharacterArray2_.push({characterName: d.characterName, houseName: d.houseName})
            })

            var fullCharacterHouse = newCharacterArray1.concat(newCharacterArray2_)

            fullCharacterHouse.forEach(function (d) {
                charToHouse.set(d.characterName, d.houseName)
            })
        }

        function houseLegend(data) {
            data.forEach(function (d) {
                d.key = d.house;
            })

            legend.selectAll(".li")
                .data(data)
                .enter()
                .append("li")
                .attr("class", "h3 li")
                .html(function (d) {
                    if (d.house == "undefined") {
                        return "N/A"
                    } else {
                        return d.house
                    }
                })
                .style("background-color", function (d) {
                    return d.color
                })
                .style("color", "white")
                .on("mouseover", function (d) {
                    dispatch3.call("househover", this, d)
                })
        }


// this happens once
        function parseNetwork(sceneArray) {

            var relation = [];

            sceneArray.forEach(function (d, i) {
                d.sceneId = i;
                var characters = d.characters;
                for (var i = 0; i < characters.length; i++) {
                    var compareChar = characters[i]
                    var obj = {
                        character: compareChar,
                        targets: [],
                        duration: d.duration,
                        sceneId: d.sceneId,
                        episodeNum: d.episodeNum,
                        seasonNum: d.seasonNum
                    };

                    for (var j = i + 1; j < characters.length; j++) {
                        obj.targets.push({
                            character: characters[j]
                        })
                    }
                    relation.push(obj)
                }
            })
            // make a new row for each character relationship. this is the array that will be filtered, and after filtering, used to count node sums
            var source_target = [];

            relation.forEach(function (d) {
                var targets = d.targets;
                targets.forEach(function (e) {
                    source_target.push({
                        source: d.character,
                        target: e.character,
                        duration: d.duration,
                        key: [d.character, e.character].sort(),
                        sceneId: d.sceneId,
                        seasonNum: d.seasonNum,
                        episodeNum: d.episodeNum
                    })
                })
            })

            filterNetwork(source_target)
        }

        var dataByCharacter;
        var dataBySeason;


// source_target is data
// here we crossfilter data, then in next funtion we will make characterNest
        $("#deselect").on("click", function (d) {
            d3.select(this).classed("active-btn", false)
            $("option:selected").prop("selected", false)
            $("#character option[value='all']").attr('selected', 'selected');
            thisCharacter = "Samwell Tarly";
            dataByCharacter.filter(null);
            dispatch.call("changedata", this, dataByCharacter.top(Infinity));
        })


        function filterNetwork(data) {


            cf_data = crossfilter(data)
            dataBySeason = cf_data.dimension(function (d) {
                return d.seasonNum
            });
            dataByCharacter = cf_data.dimension(function (d) {
                return d.key
            });


            d3.select('#character').on('change', function () {
                var value = this.value;
                thisCharacter = value;
                minNode = 5;
                if (value == "all") {
                    dataByCharacter.filter(null);
                    d3.select("#deselect").classed("active-btn", false)

                } else {
                    d3.select("#deselect").classed("active-btn", true)
                    dataByCharacter.filter(function (d) {
                        var key = d;
                        var contains = key.includes(value)
                        if (contains == true) {
                            return true;
                        }
                    });
                }
                dispatch.call("changedata", this, dataByCharacter.top(Infinity));
            })
            d3.select('#season').on('change', function () {
                if (!this.value) dataBySeason.filter(null);
                else {
                    dataBySeason.filter(this.value);
                }

                dispatch.call("changedata", this, dataBySeason.top(Infinity));
            })

            d3.select("#character")
                .selectAll("option")
                .data(mainCharacterNest)
                .enter()
                .append("option")
                .html(function (d) {
                    return d.key
                })
                .attr('value', function (d) {
                    return d.key
                })

            var seasons = [0, 1, 2, 3, 4, 5, 6, 7]

            d3.select("#season")
                .selectAll("option")
                .data(seasons)
                .enter()
                .append("option")
                .html(function (d) {
                    return "season " + d
                })
                .attr('value', function (d) {
                    return d
                })


            calculateNodeLinks(data)
        }


        dispatch.on("changedata", function (d) {
            calculateNodeLinks(d)
        })

        dispatch3.on('househover', function (d) {

            var sel = d3.selectAll(".circle").filter(function (e) {
                return charToHouse.get(e.key) == d.house;
            })
            sel.classed("active-node", true).moveToFront();


            var neighborsLinks = d3.selectAll(".line").filter(function (e) {
                if (charToHouse.get(e.source) == d.house) {
                    //neighbors.push(e.key);
                    d3.select(this).classed("active-line", true).moveToFront();
                } else if (charToHouse.get(e.target) == d.house) {
                    d3.select(this).classed("active-line", true).moveToFront();
                } else {
                    d3.select(this).classed("bkg-line", true)
                }
            })


        })


        dispatch2.on("nodehover", function (d) {
            d3.selectAll(".line").classed("active-line", false)
            d3.selectAll(".circle").classed("active-node", false).attr("stroke-width", 0)
            d3.selectAll(".blend").classed("active-node", false).attr("stroke-width", 2)

            var neighbors = [];
            var neigh = [];
            var neighborsLinks = d3.selectAll(".line").filter(function (e) {
                if (e.key.includes(d.key)) {
                    neighbors.push(e.key);
                    d3.select(this).classed("active-line", true).moveToFront();
                } else {
                    d3.select(this).classed("bkg-line", true)
                }
            })

            neighbors.forEach(function (e) {
                e.forEach(function (f) {
                    neigh.push(f)
                })
            })
            var neighborNodes = d3.selectAll(".circle").filter(function (e) {
                var contains = neigh.includes(e.key);
                if (contains == true) {
                    return true;
                }
            })
            var nonNeighborNodes = d3.selectAll(".circle").filter(function (e) {
                var contains = neigh.includes(e.key);
                if (contains == false) {
                    d3.select(this).classed("bkg-node", true)
                }
            })

            neighborNodes.moveToFront().classed("active-node", true)
        })


        function calculateNodeLinks(data) {

            var nodeArray = [];
            var eachCharacter = [];

            data.forEach(function (d) {
                var key = d.key;
                key.forEach(function (e) {
                    eachCharacter.push({character: e, seasonNum: d.seasonNum, sceneId: d.sceneId, duration: d.duration})
                })
            })

            var nodeNest = d3.nest()
                .key(function (d) {
                    return d.character
                })
                .key(function (d) {
                    return d.sceneId
                })
                .entries(eachCharacter)

            // this is where we calculate the duration of each character for nodes
            nodeNest.forEach(function (d) {
                var key = d.key;
                var values = d.values;
                var durations = [];
                values.forEach(function (e) {
                    var duration;
                    var values2 = e.values;
                    values2.forEach(function (f) {
                        duration = f.duration
                    })
                    durations.push(duration)
                })
                d.value = d3.sum(durations)
                delete d.values
            })
            nodeNest.sort(function (a, b) {
                return d3.descending(a.value, b.value)
            })


            var charRemove = [];


            nodeNest.forEach(function (d, i) {
                if (i < 20) {
                    charIcon.push(d.key)
                }
                if (i > nodeLimit) {
                    charRemove.push(d.key)
                }
            })


            var nodeNest2 = nodeNest.filter(function (d, i) {
                return !charRemove.includes(d.key)
            })


            var data2 = data.filter(function (d) {

                return !charRemove.includes(d.source)
            })
            var data3 = data2.filter(function (d) {

                return !charRemove.includes(d.target)
            })


            var linkNest = d3.nest()
                .key(function (d) {
                    return d.key
                })
                .entries(data3)

            linkNest.forEach(function (d) {
                var key = d.key.split(",")

                d.source = key[0]
                d.target = key[1]
                var k = [];
                k.push(d.source, d.target)
                d.key = k;
                durations = [];
                var values = d.values;
                values.forEach(function (e) {
                    durations.push(e.duration)
                })
                d.value = d3.sum(durations)
            })

            function sortDuration(a, b) {
                return d3.descending(a.value, b.value)
            }

            var links = linkNest.sort(sortDuration);
            var nodes = nodeNest2.sort(sortDuration);

            nodes.forEach(function (d) {
                d.image = charToImage.get(d.key)
            })

            nodeExtent = d3.extent(nodes, function (d) {
                return d.value
            })
            linkExtent = d3.extent(links, function (d) {
                return d.value
            })

            network(nodes, links)
        }


        var simulation;
        var allCharacters = [];


        function network(nodes, links) {

            simulation = d3.forceSimulation();
            d3.selectAll(".links").remove();
            d3.selectAll(".line").remove();
            d3.selectAll(".nodes").remove();
            d3.selectAll(".line").remove();
            d3.selectAll(".circle").remove();


            if (nodes.length > 200) {
                charge = -90;
            } else if (nodes.length <= 200 && nodes.length >= 100) {
                charge = -300;
            } else if (nodes.length < 100 && nodes.length >= 50) {
                charge = -600;
            } else if (nodes.length < 50) {
                charge = -900;
            }

            simulation
                .force("link", d3.forceLink().id(function (d) {
                    return d.key;
                }).iterations(1))
                .force("charge", d3.forceManyBody().strength(charge))
                .force("x", d3.forceX(width / 2))
                .force("y", d3.forceY(height / 2))


            var nodescale = d3.scale.sqrt().domain([nodeExtent[0], nodeExtent[1]]).range([minNode, maxNode])
            var linkScale = d3.scale.pow().exponent(1.3).domain([linkExtent[0], linkExtent[1]]).range([minLink, maxLink])
            var opac = d3.scale.linear().domain([linkExtent[0], linkExtent[1]]).range([.1, 1])
            var linkColor = d3.scale.linear().domain([linkExtent[0], linkExtent[1]]).range(["rgb(200,200,200)", colorMap.get(charToHouse.get(thisCharacter))])


            var link = svg.append("g")
                .attr("class", "links")
                .selectAll("line")
                .data(links)
                .enter().append("line")
                .classed("line", true)
                .attr("stroke-width", function (d) {
                    return linkScale(d.value);
                })
                .attr("opacity", function (d) {
                    return opac(d.value)
                })
                .style("stroke", function (d) {
                    return linkColor(d.value)
                })


            var node = svg.append("g")
                .classed("nodes", true)
                .selectAll("g")
                .data(nodes)
                .enter().append("g")


            var images = node.filter(function (d) {
                return d.image != undefined;
            })
                .append("svg:image")
                .attr("xlink:href", function (d) {
                    return isSecure() + "://news.northeastern.edu/interactive/2017/08/got-season-7/images/" + d.image
                })
                .attr("height", function (d) {
                    return nodescale(d.value) * 2
                })
                .attr("width", function (d) {
                    return nodescale(d.value) * 2
                });

            var circle = node.append("circle")
                .attr("r", function (d) {
                    return nodescale(d.value)
                })
                .attr("fill", function (d) {
                    return colorMap.get(charToHouse.get(d.key))
                })
                .attr("stroke", function (d) {
                    return colorMap.get(charToHouse.get(d.key))
                })
                .classed("circle", true)
                .on("mouseover", function (d) {

                    dispatch2.call("nodehover", this, d)

                    ttip.text(d.key)
                        .style("left", (d3.event.pageX + 7) + "px")
                        .style("top", (d3.event.pageY - 15) + "px")
                        .style("display", "block")
                        .style("opacity", 1);
                })
                .on("mousemove", function (d) {
                    ttip.style("left", (d3.event.pageX + 7) + "px")
                        .style("top", (d3.event.pageY - 15) + "px");
                })
                .on("mouseout", function (d) {

                    d3.selectAll(".line").classed("active-line", false).classed("bkg-line", false)
                    d3.selectAll(".circle").classed("active-node", false).attr("stroke-width", 0).classed("bkg-circle", false)
                    d3.selectAll(".blend").classed("active-node", false).attr("stroke-width", 2)


                    ttip.style("opacity", 0)
                        .style("display", "none");
                })
                .on("click", function (d) {

                    d3.select("#deselect").classed("active-btn", true)
                    var value = d.key;
                    thisCharacter = value;
                    minNode = 5;

                    dataByCharacter.filter(function (d) {
                        var key = d;
                        var contains = key.includes(value)
                        if (contains == true) {
                            return true;
                        }

                    });

                    $("#character option[value='" + value + "']").attr('selected', 'selected');
                    dispatch.call("changedata", this, dataByCharacter.top(Infinity));


                })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));


            var fcircle = d3.selectAll(".circle").filter(function (d) {
                return d.image != undefined;
            })

            fcircle.classed("blend", true)

            simulation
                .nodes(nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(links);


            function ticked() {
                link
                    .attr("x1", function (d) {
                        return d.source.x;
                    })
                    .attr("y1", function (d) {
                        return d.source.y;
                    })
                    .attr("x2", function (d) {
                        return d.target.x;
                    })
                    .attr("y2", function (d) {
                        return d.target.y;
                    });

                // nodeEnter
                //     .attr("x", function(d) { return d.x; })
                //     .attr("y", function(d) { return d.y; });

                node.attr("x", function (d) {
                    return d.x = Math.max(20, Math.min(width - 20, d.x));
                })
                    .attr("y", function (d) {
                        return d.y = Math.max(20, Math.min(height - 20, d.y));
                    });

                circle
                    .attr("cx", function (d) {
                        return d.x;
                    })
                    .attr("cy", function (d) {
                        return d.y;
                    });

                images
                    .attr("x", function (d) {
                        return d.x - (nodescale(d.value));
                    })
                    .attr("y", function (d) {
                        return d.y - (nodescale(d.value));
                    });
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        }
        window.onorientationchange = function () {
            window.location.reload();
        }

    });
});

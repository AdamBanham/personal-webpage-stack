export default `<?xml version="1.0" encoding="UTF-8"?>
<transition-system>
	<state id="b1" type="internal">
		<label>&lt;R,R,0&gt;</label>
		<position x="46" y="-110" />
	</state>
	<state id="b4" type="internal">
		<label>&lt;G,R,0&gt;</label>
		<position x="46" y="223" />
	</state>
	<state id="b5" type="internal">
		<label>&lt;Y,R,0&gt;</label>
		<position x="129" y="58" />
	</state>
	<state id="b6" type="internal">
		<label>&lt;G,R,1&gt;</label>
		<position x="354" y="223" />
	</state>
	<state id="b7" type="internal">
		<label>&lt;Y,R,1&gt;</label>
		<position x="354" y="58" />
	</state>
	<state id="b8" type="internal">
		<label>&lt;R,R,1&gt;</label>
		<position x="354" y="-110" />
	</state>
	<state id="b9" type="internal">
		<label>&lt;R,G,0&gt;</label>
		<position x="648" y="-110" />
	</state>
	<state id="b10" type="ending">
		<label>&lt;R,R,2&gt;</label>
		<position x="648" y="223" />
	</state>
	<state id="b11" type="starting">
		<label>srt</label>
		<position x="-114" y="-110" />
	</state>
	<arc id="a3">
		<label>green</label>
		<source id="b1" />
		<target id="b4" />
		<waypoints>
			<position x="76" y="-80" />
			<position x="19" y="-2" />
			<position x="19" y="156" />
			<position x="76" y="253" />
		</waypoints>
	</arc>
	<arc id="a4">
		<label>yellow</label>
		<source id="b4" />
		<target id="b5" />
		<waypoints>
			<position x="76" y="253" />
			<position x="159" y="88" />
		</waypoints>
	</arc>
	<arc id="connection_13">
		<label>red</label>
		<source id="b5" />
		<target id="b1" />
		<waypoints>
			<position x="159" y="88" />
			<position x="76" y="-80" />
		</waypoints>
	</arc>
	<arc id="a5">
		<label>click</label>
		<source id="b4" />
		<target id="b6" />
		<waypoints>
			<position x="76" y="253" />
			<position x="384" y="253" />
		</waypoints>
	</arc>
	<arc id="a6">
		<label>yellow</label>
		<source id="b6" />
		<target id="b7" />
		<waypoints>
			<position x="384" y="253" />
			<position x="384" y="88" />
		</waypoints>
	</arc>
	<arc id="a7">
		<label>red</label>
		<source id="b7" />
		<target id="b8" />
		<waypoints>
			<position x="384" y="88" />
			<position x="384" y="-80" />
		</waypoints>
	</arc>
	<arc id="connection_15">
		<label>click</label>
		<source id="b1" />
		<target id="b8" />
		<waypoints>
			<position x="76" y="-80" />
			<position x="384" y="-80" />
		</waypoints>
	</arc>
	<arc id="connection_17">
		<label>click</label>
		<source id="b5" />
		<target id="b7" />
		<waypoints>
			<position x="159" y="88" />
			<position x="384" y="88" />
		</waypoints>
	</arc>
	<arc id="a8">
		<label>walk</label>
		<source id="b8" />
		<target id="b9" />
		<waypoints>
			<position x="384" y="-80" />
			<position x="384" y="-190" />
			<position x="678" y="-190" />
			<position x="678" y="-80" />
		</waypoints>
	</arc>
	<arc id="a9">
		<label>cross</label>
		<source id="b9" />
		<target id="b10" />
		<waypoints>
			<position x="678" y="-80" />
			<position x="678" y="253" />
		</waypoints>
	</arc>
	<arc id="a11">
		<label>click</label>
		<source id="b6" />
		<target id="b6" />
		<waypoints>
			<position x="384" y="253" />
			<position x="399" y="208" />
			<position x="466" y="208" />
			<position x="466" y="298" />
			<position x="399" y="298" />
			<position x="384" y="253" />
		</waypoints>
	</arc>
	<arc id="a12">
		<label>click</label>
		<source id="b7" />
		<target id="b7" />
		<waypoints>
			<position x="384" y="88" />
			<position x="399" y="43" />
			<position x="462" y="43" />
			<position x="462" y="133" />
			<position x="399" y="133" />
			<position x="384" y="88" />
		</waypoints>
	</arc>
	<arc id="a13">
		<label>click</label>
		<source id="b8" />
		<target id="b8" />
		<waypoints>
			<position x="384" y="-80" />
			<position x="399" y="-125" />
			<position x="459" y="-125" />
			<position x="459" y="-35" />
			<position x="399" y="-35" />
			<position x="384" y="-80" />
		</waypoints>
	</arc>
	<arc id="a14">
		<label></label>
		<source id="b11" />
		<target id="b1" />
		<waypoints>
			<position x="-84" y="-80" />
			<position x="75" y="-82" />
		</waypoints>
	</arc>
</transition-system>
`
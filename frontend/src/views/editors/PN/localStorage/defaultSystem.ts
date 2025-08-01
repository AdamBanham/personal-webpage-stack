const system = `<?xml version="1.0" encoding="UTF-8"?>
<pnml>
<net type="http://www.pnml.org/version-2009/grammar/pnmlcoremodel" id="Generated by Petri Net Editor">
    <name>
        <text>Generated by Petri Net Editor</text>
    </name>
    <page id="page-1">
       <place id="place-5">
            <name>
                <text>place-5</text>
            </name>
            <graphics>
                <position x="-10" y="-76"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="c4d34191-a6bd-4e70-8689-fdc2890be2b7" />
       </place>
       <place id="place-8">
            <name>
                <text>place-8</text>
            </name>
            <graphics>
                <position x="221" y="100"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="32c659ed-6612-4138-9077-6a0119a83fed" />
       </place>
       <place id="place-9">
            <name>
                <text>place-9</text>
            </name>
            <graphics>
                <position x="222" y="-75"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="a71750c7-078a-4074-81ca-00d5369d711d" />
       </place>
       <place id="place-12">
            <name>
                <text>place-12</text>
            </name>
            <graphics>
                <position x="455" y="-75"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="760806e3-c7b6-45f9-a9dc-dbf3a6e17f19" />
       </place>
       <place id="place-14">
            <name>
                <text>place-14</text>
            </name>
            <graphics>
                <position x="455" y="100"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="f92b7762-6556-491d-aa5e-1eff3bff637d" />
       </place>
       <place id="place-17">
            <name>
                <text>place-17</text>
            </name>
            <graphics>
                <position x="647" y="14"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="f98d603a-b34c-40cc-ba9b-a2cf1849901a" />
       </place>
       <transition id="transition-7" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="103" y="-80"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="ac3bb1de-b2c5-4f3d-8dd6-b96257519868" activity="$invisible$"/>
       </transition>
       <transition id="transition-10" invisible="false">
            <name>
                <text>a</text>
            </name>
            <graphics>
                <position x="329" y="-81"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="c210c595-ce5f-4146-b227-fb19b942339e" activity=""/>
       </transition>
       <transition id="transition-11" invisible="false">
            <name>
                <text>b</text>
            </name>
            <graphics>
                <position x="329" y="9"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="6801ba0a-446a-4c78-bd3e-3603493836bb" activity=""/>
       </transition>
       <transition id="transition-13" invisible="false">
            <name>
                <text>c</text>
            </name>
            <graphics>
                <position x="329" y="95"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="63f73520-fd8d-4b98-b3a0-e8059bd6b3ca" activity=""/>
       </transition>
       <transition id="transition-15" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="344" y="184"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="a1df0b72-b4c8-4871-a928-be35d5b12a87" activity="$invisible$"/>
       </transition>
       <transition id="transition-16" invisible="true">
            <name>
                <text>action</text>
            </name>
            <graphics>
                <position x="554" y="9"/>
            </graphics>
            <toolspecific tool="ProM" version="6.4" localNodeID="c4ba8bc1-2cc1-45c5-8956-7ab8b2366bb2" activity="$invisible$"/>
       </transition>
       <arc id="flow-12" source="place-5" target="transition-7">
            <toolspecific tool="ProM" version="6.4" localNodeID="620deeb2-3dc1-443e-ac4a-a84ea6246038" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="39" y="-51"/>
                <position x="103" y="-51"/>
           </graphics>       
        </arc>
       <arc id="flow-14" source="transition-7" target="place-8">
            <toolspecific tool="ProM" version="6.4" localNodeID="b67bd1d2-2731-4bdf-908c-6c5cba066f44" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="118" y="-20"/>
                <position x="118" y="126"/>
                <position x="221" y="125"/>
           </graphics>       
        </arc>
       <arc id="flow-16" source="transition-7" target="place-9">
            <toolspecific tool="ProM" version="6.4" localNodeID="33fa5552-5d2c-424e-92ee-7b6c58f53217" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="133" y="-50"/>
                <position x="222" y="-50"/>
           </graphics>       
        </arc>
       <arc id="flow-17" source="place-9" target="transition-10">
            <toolspecific tool="ProM" version="6.4" localNodeID="aa740336-9d1d-49db-b9fb-394dbf046959" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="272" y="-51"/>
                <position x="329" y="-51"/>
           </graphics>       
        </arc>
       <arc id="flow-18" source="place-9" target="transition-11">
            <toolspecific tool="ProM" version="6.4" localNodeID="0808f27b-7813-4b0d-b396-9ca5dbb40389" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="246" y="-25"/>
                <position x="246" y="40"/>
                <position x="329" y="39"/>
           </graphics>       
        </arc>
       <arc id="flow-19" source="transition-11" target="place-12">
            <toolspecific tool="ProM" version="6.4" localNodeID="575bb038-08ce-4095-a447-00d075583ac4" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="39"/>
                <position x="479" y="39"/>
                <position x="479" y="-25"/>
           </graphics>       
        </arc>
       <arc id="flow-21" source="transition-10" target="place-12">
            <toolspecific tool="ProM" version="6.4" localNodeID="050481e5-bd17-4b2e-b3a3-3038ccfdac66" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="-51"/>
                <position x="455" y="-51"/>
           </graphics>       
        </arc>
       <arc id="flow-22" source="place-8" target="transition-13">
            <toolspecific tool="ProM" version="6.4" localNodeID="6654973d-01d7-4776-9890-a2123736e6fc" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="271" y="125"/>
                <position x="329" y="125"/>
           </graphics>       
        </arc>
       <arc id="flow-23" source="transition-13" target="place-14">
            <toolspecific tool="ProM" version="6.4" localNodeID="dc0304e5-2957-4f9c-94b5-f81dbbada79f" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="389" y="125"/>
                <position x="455" y="125"/>
           </graphics>       
        </arc>
       <arc id="flow-24" source="place-14" target="transition-15">
            <toolspecific tool="ProM" version="6.4" localNodeID="8445501a-10f5-4f32-a74d-cde400638144" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="480" y="150"/>
                <position x="480" y="214"/>
                <position x="374" y="214"/>
           </graphics>       
        </arc>
       <arc id="flow-26" source="transition-15" target="place-8">
            <toolspecific tool="ProM" version="6.4" localNodeID="cbb27614-09c0-4850-a164-457eac2a9c4a" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="344" y="214"/>
                <position x="247" y="214"/>
                <position x="246" y="150"/>
           </graphics>       
        </arc>
       <arc id="flow-27" source="place-14" target="transition-16">
            <toolspecific tool="ProM" version="6.4" localNodeID="477ea1ac-4c8e-40b3-802b-6c6eec42ff9f" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="505" y="126"/>
                <position x="569" y="126"/>
                <position x="569" y="69"/>
           </graphics>       
        </arc>
       <arc id="flow-29" source="place-12" target="transition-16">
            <toolspecific tool="ProM" version="6.4" localNodeID="3840c39a-ad72-4fa5-9a4e-b30a64322ce0" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="505" y="-51"/>
                <position x="569" y="-52"/>
                <position x="569" y="9"/>
           </graphics>       
        </arc>
       <arc id="flow-30" source="transition-16" target="place-17">
            <toolspecific tool="ProM" version="6.4" localNodeID="7b870fcd-4f91-4006-9199-0b061ad90a7c" />
            <arctype>
                <text>normal</text>
            </arctype>
            <graphics>            
                <position x="584" y="39"/>
                <position x="647" y="39"/>
           </graphics>       
        </arc>
   </page>
</net>
</pnml>
`

export default system;
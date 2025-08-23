import ShimmerLoader from "@/components/ui/ShimmerLoader";
import axios from "axios";
import { Check, ChevronLeft, PlusIcon, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

export default function SANRS_phase_manage( { changePage } ) {
    const [ showModal, setShowModal ] = useState(false);
    const [ showWinnerModal, setShowWinnerModal ] = useState(false);
    const [ showPublishModal, setShowPublishModal ] = useState(false);
    const [ showToggleModal, setShowToggleModal ] = useState({ type: '', visible: false });
    const [ showActivatePhaseModal, setShowActivatePhaseModal ] = useState(false);
    const [ showDeleteModal, setShowDeleteModal ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(true);

    const [ deleteSelection, setDeleteSelection ] = useState(null);
    const [ activateSelection, setActivateSelection ] = useState(null);

    const [ newPhaseName, setNewPhaseName ] = useState('');
    const [ newPhaseEndDate, setNewPhaseEndDate ] = useState('');

    const [ generatedWinners, setGeneratedWinners ] = useState(null);

    // const phases = [
    //     { id: 1, name: "August 2025", status: "completed", upload: false, voting: false, winners: true, topSkits: [{title: 'Skit A', votes: 120}, {title: 'Skit B', votes: 95}] },
    //     { id: 2, name: "September 2025", status: "active", upload: true, voting: true, winners: false, topSkits: [{title: 'Skit X', votes: 50}, {title: 'Skit Y', votes: 40}] },
    //     { id: 3, name: "October 2025", status: "upcoming", upload: false, voting: false, winners: false, topSkits: [] },
    //     { id: 4, name: "November 2025", status: "upcoming", upload: false, voting: false, winners: true, topSkits: [] },
    //     { id: 5, name: "December 2025", status: "upcoming", upload: true, voting: false, winners: false, topSkits: [] },
    //     { id: 6, name: "January 2026", status: "upcoming", upload: false, voting: false, winners: false, topSkits: [] },
    // ];

    const [ phases, setPhases ] = useState([]);

    const activePhase = phases.find(phase => phase.status === 'active');

    const handlePhaseDelete = (id) => {
        setDeleteSelection(id);
        setShowDeleteModal(!showDeleteModal);
    }

    const phaseToBeDeleted = phases.find(phase => phase.id === deleteSelection );
    const phaseToBeActivated = phases.find(phase => phase.id === activateSelection );

    const createPhase = () => {
        const newPhaseId = phases.length + 1;
        const newPhaseData = { 
            id:newPhaseId, 
            name:newPhaseName, 
            endDate:newPhaseEndDate,
            status:'upcoming',
            upload:false,
            voting:false,
            winners:false,
            topSkits:[],
         };
        const newPhases = phases;
        newPhases.push(newPhaseData);
        setPhases(newPhases);
        setShowModal(false);
    }

    const deletePhase = () => {
        const newPhase = phases.filter( phase => phase.id !== phaseToBeDeleted?.id );
        setPhases(newPhase);
        setShowDeleteModal(false);
        setDeleteSelection(false);
        
    }

    const activatePhase = () => {
        phaseToBeActivated.status = 'active';
        const newPhases = phases.filter( phase => phase.id !== phaseToBeActivated.id );
        setPhases( [ ...newPhases, phaseToBeActivated ]);
        setShowActivatePhaseModal(false);
        setActivateSelection(null);
        
    }

    const generateWinners = () => {
        const winners = [
            {title: 'Skit A', votes: 120, skit:1, user:{ fullname:"Alimam Ahmed", userId:'37y4884'}},
            {title: 'Skit B', votes: 95, skit:2, user:{ fullname:"Alimam Ahmed", userId:'37y4884'}},
            ];
        setGeneratedWinners(winners);
        
    }

    const saveGeneratedWinners = () => {
        activePhase.topSkits = generatedWinners;
        activePhase.winners = true;
        const updatedActivePhase = { ...activePhase };
        console.log(updatedActivePhase)
        const newPhases = phases.filter( phase => phase.id !== activePhase.id );
        setPhases( [ ...newPhases, updatedActivePhase ]);
        setShowWinnerModal(false);
        setGeneratedWinners(null);
    }

    const publishWinners = () => {
        activePhase.status = 'completed';
        const updatedActivePhase = { ...activePhase };
        console.log(updatedActivePhase)
        const newPhases = phases.filter( phase => phase.id !== activePhase.id );
        setPhases( [ ...newPhases, updatedActivePhase ]);
        setShowPublishModal(false);
    }

    const votingToggle = () => {
        activePhase.voting = !activePhase.voting;
        const updatedActivePhase = { ...activePhase };
        console.log(updatedActivePhase);
        const newPhases = phases.filter( phase => phase.id !== activePhase.id );
        setPhases( [ ...newPhases, updatedActivePhase ]);
    }

    const uploadToggle = () => {
        activePhase.upload = !activePhase.upload;
        const updatedActivePhase = { ...activePhase };
        console.log(updatedActivePhase);
        const newPhases = phases.filter( phase => phase.id !== activePhase.id );
        setPhases( [ ...newPhases, updatedActivePhase ]);
    }

    const activePhaseToggles = () => {
        if ( showToggleModal.type === 'voting' ) {
            votingToggle();
        } else if ( showToggleModal.type === 'upload' ) {
            uploadToggle();
        }
        setShowToggleModal({ type: '', visible: false });
    }

    const handleActivateSelect = (id) => {
        setActivateSelection(id);
    }

    const handleActivatePhaseModal = () => {
        setShowActivatePhaseModal(!showActivatePhaseModal)
    }

    useEffect(() => {
        const getDatas = async () => {
            try {
                const response = await axios.get('/api/admin/SANRS/phase');
                const data = await response.data;
                console.log(data);
                // setPhases(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        getDatas();
    }, []);

    return (
        <>
            <button onClick={changePage} className="text-[13px] text-white  bg-green-600 hover:bg-green-700 items-center rounded-[7px] py-1 px-5 flex flex-row mb-1">
                <ChevronLeft strokeWidth={1.5} size={20}/>
                <span>Back to Statistics</span>
            </button>
            { isLoading && (
                <div className="flex flex-row items-start h-full w-full justify-between bg-white/50 backdrop-blur-sm">
                    <div className="w-[60%] flex flex-col gap-2">
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'370px'}/>
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'200px'}/>
                    </div>
                    <div className="w-[38%] flex flex-col gap-2">
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'150px'}/>
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'100px'}/>
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'100px'}/>
                        <ShimmerLoader width={'100%'} roundedness={'15px'} height={'100px'}/>
                    </div>
                </div>
            )}

            { !isLoading && (
                <div className="h-full flex flex-row justify-between items-start">
                    <div className="w-[60%]">
                        <div className="bg-white w-full shadow-lg border rounded-[15px] p-3 mb-3">
                            <h2 className="text-[16px] font-semibold mb-3">All Phases</h2>
                            { phases.length !== 0 ? (
                                <ul className="space-y-3">
                                    {phases.map((phase) => (
                                        <li key={phase.id} className="flex items-center justify-between p-1 border rounded-lg">
                                            <span className="font-light text-[15px]">{phase.name}</span>
                                            {phase.status === "completed" && <span className="px-2 py-1 text-[11px] bg-gray-300 rounded-full">Completed</span>}
                                            {phase.status === "active" && <span className="px-2 py-1 text-[11px] bg-green-300 rounded-full">Active</span>}
                                            {phase.status === "upcoming" && <span className="px-2 py-1 text-[11px] bg-blue-300 rounded-full">Upcoming</span>}
                                        </li>
                                    ))}
                                </ul>
                            ): (
                                <div className="h-[100px] flex flex-col justify-center items-center w-full text-gray-500 text-[13px]">
                                    <span>No phase added.</span>
                                </div>
                            )}
                            <button onClick={() => setShowModal(true)} className="mt-3 px-4 py-1 bg-green-600 hover:bg-green-800 text-white rounded-[7px]">
                                Create New Phase
                                <PlusIcon size={'20px'} className="inline-block ml-2" />
                            </button>
                        </div>
                        <div className="bg-white shadow rounded-2xl p-3">
                            <h2 className="text-[16px] font-semibold mb-3">Active Phase Controls</h2>
                            {activePhase ? (
                                <>
                                    <div className="flex flex-row justify-between items-center mb-1">
                                        <span className="text-[14px]">Managing: <span className="font-bold">{activePhase.name}</span></span>
                                        <span className="text-[13px] text-gray-500">Scheduled to End: <span className="text-red-500/80">{ activePhase.endDate} </span> </span>
                                    </div>

                                    <div className="flex flex-col gap-1 text-[14px]">
                                        <div className="flex items-center justify-between">
                                            <span>Uploads</span>
                                            <button onClick={() => setShowToggleModal({ type: 'upload', visible: true })} className={`px-3 py-1 text-[12px] flex flex-row items-center rounded-[7px] ${activePhase.upload ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}>
                                                {activePhase.upload ? 'Active' : 'OFF'} {activePhase.upload && <Check size={'20px'} className="inline-block ml-2" />}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span>Voting</span>
                                            <button onClick={() => setShowToggleModal({ type: 'voting', visible: true })} className={`px-3 py-1 text-[12px] flex flex-row items-center rounded-[7px] ${activePhase.voting ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-400 hover:bg-gray-500'} text-white`}>
                                                {activePhase.voting ? 'Active' : 'OFF'} {activePhase.voting && <Check size={'20px'} className="inline-block ml-2" />}
                                            </button>
                                        </div>
                                        <div className="flex flex-row gap-2 mt-3 items-center justify-between">
                                            <button 
                                                className={`${activePhase.winners ? 'bg-gray-300 cursor-not-allowed':'bg-gray-600 hover:bg-gray-800'} h-[35px] text-white w-[48%] rounded-[7px]`} 
                                                onClick={!activePhase.winners ? () => setShowWinnerModal(true) : () => {}}>
                                                    Generate Winners
                                            </button>
                                            <button 
                                                className={`${ (activePhase.topSkits.length > 0 && activePhase.winners ) ? 'bg-green-600 hover:bg-green-700':'bg-gray-300 cursor-not-allowed'} h-[35px] w-[48%] text-white rounded-[7px]`} 
                                                onClick={ (activePhase.topSkits.length > 0 && activePhase.winners ) ? () => setShowPublishModal(true) : () => {}}>
                                                    Publish Winners
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ):(
                                <div className="h-[120px] flex flex-col justify-center gap-3 items-center w-full text-gray-500 text-[13px]">
                                    <span>No phase is active.</span>
                                    <button onClick={handleActivatePhaseModal} className="mt-3 px-4 py-1 bg-green-600 hover:bg-green-800 text-white rounded-[7px]">
                                        Activate a phase
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                    
                    <div className="flex flex-col w-[38%] gap-2">
                        {phases.filter(p => p.status === 'completed').map(phase => (
                            <div key={phase.id} className="bg-white shadow rounded-2xl text-[15px] p-3">
                                <h2 className="text-[13px] text-gray-500 mb-1">
                                    Completed Phase
                                    <Check size={'13px'} className="inline text-green-500 ml-2"/>
                                </h2>
                                <p className="mb-1 text-[14px]">Phase: <span className="font-semibold">{phase.name}</span></p>
                                <div className="flex flex-row gap-2 text-[13px] items-center">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <p className="text-gray-500">Winners Published </p>
                                </div>
                                <ul className="list-disc list-inside text-[12px]">
                                    {phase.topSkits.map((skit, idx) => (
                                        <li key={idx}>{idx === 0 ? '1st' : '2nd'} Place: {skit.title} ({skit.votes} votes)</li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {phases.filter(p => p.status === 'upcoming').map(phase => (
                            <div key={phase.id} className="bg-white shadow rounded-2xl p-3">
                                <div className="flex flex-row justify-between items-center">
                                    <h2 className="text-[13px] text-gray-500">
                                        Upcoming Phase
                                        <RefreshCcw size={'12px'} className="inline text-blue-500 ml-2"/>
                                    </h2>
                                    <button onClick={()=>{handlePhaseDelete(phase.id)}} className="px-3 py-1 hover:bg-red-700 bg-red-500 rounded-[7px] text-white text-[11px]">Delete</button>
                                </div>
                                <p className="text-[15px]">Phase: <span className="font-bold">{phase.name}</span></p>
                            </div>
                        ))}
                    </div>

                    {showToggleModal.visible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Toggle {showToggleModal.type === 'upload' ? 'Uploads' : 'Voting'}</h2>
                                <p className="mb-4">Are you sure you want to {activePhase[showToggleModal.type] ? 'turn off' : 'turn on'} {showToggleModal.type === 'upload' ? 'uploads' : 'voting'} for this phase?</p>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowToggleModal({ type: '', visible: false })} className="px-4 py-1 text-[14px] bg-gray-300 rounded-[7px]">Cancel</button>
                                    <button onClick={activePhaseToggles} className="px-4 py-1 text-[14px] bg-blue-600 text-white rounded-[7px]">Confirm</button>
                                </div>
                            </div>
                        </div>
                    )}


                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Create New Phase</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium">Phase Name</label>
                                        <input value={newPhaseName} onChange={(e) => { setNewPhaseName(e.target.value)}} type="text" className="w-full border rounded p-2 mt-1" placeholder="e.g. November 2025" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">End Date</label>
                                        <input value={newPhaseEndDate} onChange={(e) => {setNewPhaseEndDate(e.target.value)}} type="date" className="w-full border rounded p-2 mt-1" />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button onClick={() => setShowModal(false)} className="px-4 py-1 text-[14px] bg-gray-300 rounded-[7px]">Cancel</button>
                                    <button onClick={createPhase} className="px-4 py-1 text-[14px] bg-green-600 hover:bg-green-800 text-white rounded-[7px]">Save Phase</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showActivatePhaseModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                                <span className="text-xl font-semibold block">Activate New Phase</span>
                                <span className="text-[14px] text-gray-500">Select phase to activate</span>
                                <div className="space-y-2 mt-4">
                                    { phases.filter( ( { status }) => status !== 'completed').map( ( { name, id }, index ) => {
                                        return (
                                            <button key={index} onClick={() =>{handleActivateSelect(id)}} className="flex flex-row w-full justify-between p-2 text-[14px] rounded-[7px] cursor-pointer items-center hover:bg-gray-200">
                                                <span>{name}</span>
                                                <div className="h-5 w-5 border-gray-700 border flex flex-col justify-center items-center rounded-full">
                                                    { phaseToBeActivated?.id === id && <div className="h-[70%] w-[70%] bg-green-500 rounded-full"></div>}
                                                </div>
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className="mt-6 flex justify-end gap-3">
                                    <button onClick={handleActivatePhaseModal} className="px-4 py-1 text-[14px] bg-gray-300 rounded-[7px]">Cancel</button>
                                    <button onClick={activatePhase} className="px-4 py-1 text-[14px] bg-green-600 hover:bg-green-800 text-white rounded-[7px]">Activate</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showWinnerModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-[550px] transition-all ease-in-out duration-300">
                                <h2 className="text-xl font-semibold mb-3">Confirm Generate Winners</h2>
                                { !generatedWinners ? (
                                    <>
                                        <p className="mb-4">Top skits will be selected based on votes.</p>
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => setShowWinnerModal(false)} className="px-4 py-1 text-[14px] hover:bg-gray-400 bg-gray-300 rounded-[7px]">Cancel</button>
                                            <button onClick={generateWinners} className="px-4 py-1 text-[14px] bg-red-500 text-white rounded-[7px]">Generate</button>
                                        </div>                           
                                    </>
                                ):(
                                    <>
                                        <div className="h-[100px] rounded-[10px] w-full">
                                            <div className="w-full flex flex-row justify-between items-center">
                                                <div className="bg-green-800 text-[13px] text-white w-[24.8%] py-1 rounded-tl-[7px] pl-3">Title</div>
                                                <div className="bg-green-800 text-[13px] text-white w-[24.8%] py-1 pl-3">Creator</div>
                                                <div className="bg-green-800 text-[13px] text-white w-[24.8%] py-1 pl-3">Votes</div>
                                                <div className="bg-green-800 text-[13px] text-white w-[24.8%] py-1 pl-3">skit</div>
                                                <div className="bg-green-800 text-[13px] text-white w-[24.8%] py-1 rounded-tr-[7px] pl-3">userId</div>
                                            </div>
                                            { generatedWinners?.map( ( winner, index ) => {
                                                return (
                                                    <div className="w-full flex flex-row justify-between items-center" key={index}>
                                                        <div className="bg-gray-200 text-[11px] text-gray-700 w-[24.8%] py-1 pl-3">{ winner?.title }</div>
                                                        <div className="bg-gray-200 text-[11px] text-gray-700 w-[24.8%] py-1 pl-3">{ winner?.user?.fullname }</div>
                                                        <div className="bg-gray-200 text-[11px] text-gray-700 w-[24.8%] py-1 pl-3">{ winner?.votes }</div>
                                                        <div className="bg-gray-200 text-[11px] text-gray-700 w-[24.8%] py-1 pl-3">{ winner?.skit }</div>
                                                        <div className="bg-gray-200 text-[11px] text-gray-700 w-[24.8%] py-1 pl-3">{ winner?.user?.userId }</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className="flex flex-row justify-end gap-3 mt-1">
                                            <button onClick={() => { setShowWinnerModal(false); setGeneratedWinners(null); }} className="px-5 py-1 text-[14px] hover:bg-gray-400 bg-gray-300 rounded-[7px]">Cancel</button>
                                            <button onClick={saveGeneratedWinners} className="px-5 py-1 text-[14px] bg-green-600 hover:bg-green-700 text-white rounded-[7px]">Save</button>
                                        </div>
                                    </>
                                )}

                            </div>
                        </div>
                    )}

                    { showPublishModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Publish Winners</h2>
                                <p className="mb-4">Once published, the winners will be visible to all users and the phase will be closed.</p>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowPublishModal(false)} className="px-4 py-1 text-[14px] bg-gray-300 rounded-[7px]">Cancel</button>
                                    <button onClick={publishWinners} className="px-4 py-1 text-[14px] bg-purple-600 text-white rounded-[7px]">Publish</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showDeleteModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                                <h2 className="text-xl font-semibold mb-4">Delete Phase</h2>
                                <p className="mb-4">Are you sure you want to delete &quot;{phaseToBeDeleted?.name}&quot; phase?</p>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => { handlePhaseDelete('')}} className="px-4 py-1 text-[14px] bg-gray-300 rounded-[7px]">Cancel</button>
                                    <button onClick={deletePhase} className="px-4 py-1 text-[14px] bg-red-600 text-white rounded-[7px]">delete</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </>
    );
}

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface FiltersProps {
    onSubmitFilters: any;
    onClearFilters: any;
}

interface filtersObj {
    firstName?: string | null;
    lastName?: string | null;
    date?: string | null;
    shift?: string | null;
    status?: string | null;
    area?: string | null;
}

const Filters: React.FC<FiltersProps> = ({ onSubmitFilters, onClearFilters }) => {
    const [isShowFilters, setIsShowFilters] = useState<boolean>(false);
    const fNameRef = useRef<HTMLInputElement | null>(null);
    const lNameRef = useRef<HTMLInputElement | null>(null);
    const shiftRef = useRef<HTMLSelectElement | null>(null);
    const statusRef = useRef<HTMLSelectElement | null>(null);
    const areaRef = useRef<HTMLSelectElement | null>(null);

    const submitFilters = (e: any) => {
        e.preventDefault();
        const selectedFilters: filtersObj = {
            firstName: fNameRef.current?.value !== '' ? fNameRef.current?.value : null,
            lastName: lNameRef.current?.value !== '' ? lNameRef.current?.value : null,
            shift: shiftRef.current?.value !== 'ALL' ? shiftRef.current?.value : null,
            status: statusRef.current?.value !== 'ALL' ? statusRef.current?.value : null,
            area: areaRef.current?.value !== 'ALL' ? areaRef.current?.value : null,
        }
        onSubmitFilters(selectedFilters);
    }

    const clearFilters = (e: any) => {
        e.preventDefault();
        onClearFilters();
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <button className="btn btn-warning mb-2" onClick={() => setIsShowFilters(!isShowFilters)}>
                {isShowFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
            </div>

            {isShowFilters &&
                <div className="filters__blk card card-body mb-3">
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="shiftFormControlSelect">First Name</label>
                                    <input type="text" className="form-control" ref={fNameRef} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="shiftFormControlSelect">Last Name</label>
                                    <input type="text" className="form-control" ref={lNameRef} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="shiftFormControlSelect">Shift</label>
                                    <select className="form-control" id="shiftFormControlSelect" ref={shiftRef}>
                                        <option value="ALL">ALL</option>
                                        <option value="DINNER">DINNER</option>
                                        <option value="LUNCH">LUNCH</option>
                                        <option value="BREAKFAST">BREAKFAST</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="statusFormControlSelect">Status</label>
                                    <select className="form-control" id="statusFormControlSelect" ref={statusRef}>
                                        <option value="ALL">ALL</option>
                                        <option value="CONFIRMED">CONFIRMED</option>
                                        <option value="SEATED">SEATED</option>
                                        <option value="CHECKED OUT">CHECKED OUT</option>
                                        <option value="NOT CONFIRMED">NOT CONFIRMED</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="areaFormControlSelect">Area</label>
                                    <select className="form-control" id="areaFormControlSelect" ref={areaRef}>
                                        <option value="ALL">ALL</option>
                                        <option value="BAR">BAR</option>
                                        <option value="MAIN ROOM">MAIN ROOM</option>
                                    </select>
                                </div>
                            </div>
                            {/* <div className="col-md-4">

                            </div> */}
                        </div>
                        <div className="form-actions mt-3">
                            <button type="button" className="btn btn-primary" onClick={(e) => submitFilters(e)}>submit</button>
                            <button type="button" className="btn btn-danger mx-2" onClick={(e) => clearFilters(e)}>clear</button>
                        </div>
                    </form>
                </div>
            }
        </>
        
    );
};

export default Filters;

import React, { useRef, useState } from 'react';

interface FiltersProps {
    onSubmitFilters: any;
    onClearFilters: any;
}

interface filtersObj {
    firstName?: string | null;
    lastName?: string | null;
    businessDate?: string | null;
    shift?: string | null;
    status?: string | null;
    area?: string | null;
}

const Filters: React.FC<FiltersProps> = ({ onSubmitFilters, onClearFilters }) => {
    const [isShowFilters, setIsShowFilters] = useState<boolean>(false);
    const fNameRef = useRef<HTMLInputElement | null>(null);
    const lNameRef = useRef<HTMLInputElement | null>(null);
    const dateRef = useRef<HTMLInputElement | null>(null);
    const shiftRef = useRef<HTMLSelectElement | null>(null);
    const statusRef = useRef<HTMLSelectElement | null>(null);
    const areaRef = useRef<HTMLSelectElement | null>(null);

    const submitFilters = (e: any) => {
        e.preventDefault();
        const selectedFilters: filtersObj = {
            firstName: fNameRef.current?.value !== '' ? fNameRef.current?.value : null,
            lastName: lNameRef.current?.value !== '' ? lNameRef.current?.value : null,
            businessDate: dateRef.current?.value !== '' ? getFormattedDate(dateRef.current?.value as string) : null,
            shift: shiftRef.current?.value !== 'ALL' ? shiftRef.current?.value : null,
            status: statusRef.current?.value !== 'ALL' ? statusRef.current?.value : null,
            area: areaRef.current?.value !== 'ALL' ? areaRef.current?.value : null,
        }
        onSubmitFilters(selectedFilters);
    }

    const clearFilters = (e: any) => {
        e.preventDefault();
        fNameRef.current!.value = '';
        lNameRef.current!.value = '';
        dateRef.current!.value = '';
        shiftRef.current!.value = 'ALL';
        statusRef.current!.value = 'ALL';
        areaRef.current!.value = 'ALL';

        onClearFilters();
    }

    const getFormattedDate = (date: string): string => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2);
        const day = `0${d.getDate()}`.slice(-2);

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    }

    return (
        <>
            <div className="d-flex justify-content-end">
                <button id="toggle-filters" className="btn btn-warning mb-2" onClick={() => setIsShowFilters(!isShowFilters)}>
                    <span className="material-icons">filter_list</span>
                    <span className='d-inline-block mx-2'>{isShowFilters ? 'Hide Filters' : 'Show Filters'}</span>
                </button>
            </div>

            {isShowFilters &&
                <div className="filters__blk card card-body mb-3">
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="fNameFormControlSelect">First Name</label>
                                    <input id="fNameFormControlSelect" type="text" className="form-control" ref={fNameRef} />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="lNameFormControlSelect">Last Name</label>
                                    <input id="lNameFormControlSelect" type="text" className="form-control" ref={lNameRef} />
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="form-group">
                                    <label htmlFor="dateFormControlSelect">Date</label>
                                    <input id="dateFormControlSelect" type="date" className="form-control" ref={dateRef} />
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

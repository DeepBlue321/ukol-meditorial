import React from 'react';

export function Labels({ labels,className }: any) {
  const testLabels =[{label: {name: "Technologie"}},{label: {name: "Technologie"}},{label: {name: "Technologie"}},{label: {name: "Technologie"}}]
  const labelsToShow = labels.length > 0 ? labels : testLabels;
  
  return (
    /* should use cn() */
    <div className={"flex flex-wrap gap-2 " + className}>
      <div className="flex flex-wrap justify-end gap-2 ">
        {labelsToShow.map((label: any, index: number) => (
          <React.Fragment key={label.label.name}>
            <span className="text-red-600 text-sm font-medium py-0.5">
              {label.label.name}
            </span>
            {index < labelsToShow.length - 1 && <span className="text-red-600 text-sm">|</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
